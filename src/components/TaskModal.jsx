import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import TaskForm from './TaskForm';

/**
 * TaskModal Component
 * Modal wrapper for adding and editing tasks.
 */
export default function TaskModal({
  isOpen,
  onClose,
  initialTask = null,
  onSubmit
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEditing = !!initialTask;
  const modalTitle = isEditing ? 'Edit Task' : 'Create New Task';

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="task-modal-title" className="modal-title">
            {modalTitle}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <TaskForm
            initialTask={initialTask}
            onSubmit={onSubmit}
            onCancel={onClose}
            submitLabel={isEditing ? 'Save Changes' : 'Create Task'}
          />
        </div>
      </div>
    </div>
  );
}
