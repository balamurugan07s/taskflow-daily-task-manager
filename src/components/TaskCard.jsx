import React from 'react';
import { Calendar, Check, Edit2, Trash2, Clock, AlertCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { isOverdue, formatDisplayDate, getRelativeDueLabel } from '../utils/dateUtils';

/**
 * TaskCard Component
 * Displays individual task details, badges, completion checkbox, and actions.
 */
export default function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onSelect
}) {
  const isCompleted = task.status === 'Completed';
  const overdue = isOverdue(task.dueDate, task.status);
  const dueLabel = getRelativeDueLabel(task.dueDate, task.status);

  return (
    <article
      className={`task-card ${isCompleted ? 'is-completed' : ''} ${overdue ? 'is-overdue' : ''}`}
      aria-label={`Task: ${task.title}`}
    >
      {/* Header with Checkbox & Title */}
      <div className="task-card-header">
        <div className="task-checkbox-container">
          <button
            type="button"
            className={`custom-checkbox ${isCompleted ? 'checked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(task.id);
            }}
            aria-label={isCompleted ? `Mark "${task.title}" as pending` : `Mark "${task.title}" as completed`}
            aria-checked={isCompleted}
            role="checkbox"
          >
            {isCompleted && <Check size={14} strokeWidth={3} />}
          </button>

          <div
            style={{ cursor: onSelect ? 'pointer' : 'default', flex: 1 }}
            onClick={() => onSelect && onSelect(task)}
            title="Click to view details"
          >
            <h3 className="task-title">{task.title}</h3>
          </div>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className="task-description"
          onClick={() => onSelect && onSelect(task)}
          style={{ cursor: onSelect ? 'pointer' : 'default' }}
        >
          {task.description}
        </p>
      )}

      {/* Badges Row (Priority, Status, Category) */}
      <div className="task-badges-row">
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
        <span className="badge badge-category">{task.category}</span>
        {overdue && (
          <span className="badge badge-priority-urgent">
            <AlertCircle size={12} />
            <span>Overdue</span>
          </span>
        )}
      </div>

      {/* Footer Meta & Actions */}
      <div className="task-meta-row">
        <div className={`task-due-date ${overdue ? 'is-overdue' : ''}`}>
          <Calendar size={14} />
          <span>{dueLabel}</span>
        </div>

        <div className="task-actions">
          <button
            type="button"
            className="action-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            aria-label={`Edit task "${task.title}"`}
            title="Edit task"
          >
            <Edit2 size={15} />
          </button>

          <button
            type="button"
            className="action-icon-btn btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            aria-label={`Delete task "${task.title}"`}
            title="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
