import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';

/**
 * EmptyState Component
 * Displays friendly illustration and call to action when no tasks match.
 */
export default function EmptyState({
  title = "No Tasks Found",
  description = "Get started by adding your first daily goal or adjusting your active filters.",
  icon = <ClipboardList size={36} />,
  actionLabel = "Create New Task",
  onAction
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-wrapper">
        {icon}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="btn-primary-action"
        >
          <Plus size={18} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
