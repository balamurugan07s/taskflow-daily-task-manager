import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import {
  VALID_PRIORITIES,
  VALID_CATEGORIES,
  VALID_STATUSES,
  validateTask,
  validateField
} from '../utils/validation';
import { getTodayDateString } from '../utils/dateUtils';

/**
 * TaskForm Component
 * Reusable controlled form for creating and editing tasks.
 * Performs real-time client-side validation with immediate visual error states.
 */
export default function TaskForm({
  initialTask = null,
  onSubmit,
  onCancel,
  submitLabel = "Save Task"
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: getTodayDateString(),
    priority: 'Medium',
    category: 'Work',
    status: 'Pending'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Pre-fill existing task data when editing
  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title || '',
        description: initialTask.description || '',
        dueDate: initialTask.dueDate || getTodayDateString(),
        priority: initialTask.priority || 'Medium',
        category: initialTask.category || 'Work',
        status: initialTask.status || 'Pending'
      });
      setErrors({});
      setTouched({});
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: getTodayDateString(),
        priority: 'Medium',
        category: 'Work',
        status: 'Pending'
      });
      setErrors({});
      setTouched({});
    }
  }, [initialTask]);

  // Handle input change & clear error on correction
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation if field was touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      title: true,
      description: true,
      dueDate: true,
      priority: true,
      category: true,
      status: true
    });

    const validation = validateTask(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
  };

  const descriptionLength = formData.description ? formData.description.length : 0;

  return (
    <form onSubmit={handleSubmit} noValidate id="task-form">
      {/* Task Title */}
      <div className="form-group">
        <label htmlFor="task-title-input" className="form-label">
          <span>Task Title <span className="form-label-required">*</span></span>
          <span className="form-char-count">{formData.title.length}/80</span>
        </label>
        <input
          type="text"
          id="task-title-input"
          name="title"
          className={`form-input ${errors.title ? 'has-error' : ''}`}
          placeholder="e.g., Complete React full-stack project"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={80}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          autoFocus
        />
        {errors.title && (
          <div id="title-error" className="form-error-msg" role="alert">
            <AlertCircle size={14} />
            <span>{errors.title}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="task-desc-input" className="form-label">
          <span>Description <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span></span>
          <span className="form-char-count">{descriptionLength}/300</span>
        </label>
        <textarea
          id="task-desc-input"
          name="description"
          rows={3}
          className={`form-textarea ${errors.description ? 'has-error' : ''}`}
          placeholder="Provide brief details or checklist items..."
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={300}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "desc-error" : undefined}
        />
        {errors.description && (
          <div id="desc-error" className="form-error-msg" role="alert">
            <AlertCircle size={14} />
            <span>{errors.description}</span>
          </div>
        )}
      </div>

      {/* Row: Due Date & Priority */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-due-date-input" className="form-label">
            <span>Due Date <span className="form-label-required">*</span></span>
          </label>
          <input
            type="date"
            id="task-due-date-input"
            name="dueDate"
            className={`form-input ${errors.dueDate ? 'has-error' : ''}`}
            value={formData.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.dueDate}
            aria-describedby={errors.dueDate ? "due-date-error" : undefined}
          />
          {errors.dueDate && (
            <div id="due-date-error" className="form-error-msg" role="alert">
              <AlertCircle size={14} />
              <span>{errors.dueDate}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="task-priority-input" className="form-label">
            <span>Priority <span className="form-label-required">*</span></span>
          </label>
          <select
            id="task-priority-input"
            name="priority"
            className={`form-select ${errors.priority ? 'has-error' : ''}`}
            value={formData.priority}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.priority}
            aria-describedby={errors.priority ? "priority-error" : undefined}
          >
            {VALID_PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.priority && (
            <div id="priority-error" className="form-error-msg" role="alert">
              <AlertCircle size={14} />
              <span>{errors.priority}</span>
            </div>
          )}
        </div>
      </div>

      {/* Row: Category & Status */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-category-input" className="form-label">
            <span>Category <span className="form-label-required">*</span></span>
          </label>
          <select
            id="task-category-input"
            name="category"
            className={`form-select ${errors.category ? 'has-error' : ''}`}
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            {VALID_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && (
            <div id="category-error" className="form-error-msg" role="alert">
              <AlertCircle size={14} />
              <span>{errors.category}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="task-status-input" className="form-label">
            <span>Status <span className="form-label-required">*</span></span>
          </label>
          <select
            id="task-status-input"
            name="status"
            className={`form-select ${errors.status ? 'has-error' : ''}`}
            value={formData.status}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.status}
            aria-describedby={errors.status ? "status-error" : undefined}
          >
            {VALID_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.status && (
            <div id="status-error" className="form-error-msg" role="alert">
              <AlertCircle size={14} />
              <span>{errors.status}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="modal-footer" style={{ margin: '1.5rem -1.5rem -1.5rem', padding: '1rem 1.5rem' }}>
        <button
          type="button"
          className="btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          id="btn-submit-task"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
