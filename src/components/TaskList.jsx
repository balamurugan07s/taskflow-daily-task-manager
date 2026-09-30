import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

/**
 * TaskList Component
 * Displays a grid of tasks or an EmptyState fallback when no tasks exist.
 */
export default function TaskList({
  tasks = [],
  onToggleComplete,
  onEdit,
  onDelete,
  onSelect,
  emptyTitle = "No Tasks Available",
  emptyDescription = "You're all caught up! Create a new task to organize your day.",
  onEmptyAction
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Create New Task"
        onAction={onEmptyAction}
      />
    );
  }

  return (
    <div className="tasks-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
