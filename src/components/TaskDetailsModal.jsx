import React, { useEffect } from 'react';
import { X, Calendar, Clock, Edit2, Trash2, CheckCircle2, Tag, Flag } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatDisplayDate, formatDisplayDateTime, isOverdue } from '../utils/dateUtils';

/**
 * TaskDetailsModal Component
 * Full inspector modal displaying complete metadata for a selected task.
 */
export default function TaskDetailsModal({
  task,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onToggleComplete
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const isCompleted = task.status === 'Completed';
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-details-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h2 id="task-details-title" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {task.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {task.description || <em style={{ color: 'var(--text-muted)' }}>No description provided.</em>}
            </p>
          </div>

          {/* Details Table / Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            background: 'var(--bg-app)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                Due Date
              </span>
              <span style={{ fontWeight: 600, color: overdue ? 'var(--color-danger)' : 'var(--text-primary)' }}>
                {formatDisplayDate(task.dueDate)} {overdue && '(Overdue)'}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                Category
              </span>
              <span style={{ fontWeight: 600 }}>{task.category}</span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                Created At
              </span>
              <span style={{ fontSize: '0.85rem' }}>{formatDisplayDateTime(task.createdAt)}</span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                Last Updated
              </span>
              <span style={{ fontSize: '0.85rem' }}>{formatDisplayDateTime(task.updatedAt)}</span>
            </div>

            {task.completedAt && (
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                  Completed At
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 600 }}>
                  {formatDisplayDateTime(task.completedAt)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onToggleComplete(task.id)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <CheckCircle2 size={16} />
            <span>{isCompleted ? 'Mark Pending' : 'Mark Completed'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                onClose();
                onEdit(task);
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Edit2 size={16} />
              <span>Edit</span>
            </button>

            <button
              type="button"
              className="btn-danger"
              onClick={() => {
                onClose();
                onDelete(task);
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
