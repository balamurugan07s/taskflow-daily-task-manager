import React, { useMemo } from 'react';
import { Calendar, Plus, CheckCircle2, Clock } from 'lucide-react';
import TaskList from '../components/TaskList';
import { getTodayDateString, formatDisplayDate } from '../utils/dateUtils';

/**
 * TodayTasks View
 * Dedicated view focusing exclusively on items scheduled for the current day.
 */
export default function TodayTasks({
  tasks = [],
  onToggleComplete,
  onEdit,
  onDelete,
  onSelect,
  onOpenCreateModal
}) {
  const todayDateStr = getTodayDateString();
  const formattedToday = formatDisplayDate(todayDateStr);

  // Filter tasks due today
  const todayTasks = useMemo(() => {
    return tasks.filter(t => t.dueDate === todayDateStr);
  }, [tasks, todayDateStr]);

  const completedToday = todayTasks.filter(t => t.status === 'Completed').length;
  const pendingToday = todayTasks.filter(t => t.status !== 'Completed').length;

  return (
    <div className="today-tasks-page">
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-priority-high" style={{ padding: '0.2rem 0.6rem' }}>
              <Calendar size={13} />
              <span>{formattedToday}</span>
            </span>
          </div>
          <h1 className="page-title">Today's Focus</h1>
          <p className="page-subtitle">
            {todayTasks.length === 0
              ? "No tasks due today. Enjoy your day or plan ahead!"
              : `${pendingToday} pending, ${completedToday} completed today.`}
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="btn-primary-action"
          id="btn-today-new-task"
        >
          <Plus size={18} />
          <span>Add Task For Today</span>
        </button>
      </div>

      {/* Quick Summary Pill Bar */}
      {todayTasks.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
          background: 'var(--bg-surface)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} color="var(--color-warning)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Pending Today:</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-warning)' }}>
              {pendingToday}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
            <CheckCircle2 size={16} color="var(--color-success)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Completed Today:</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-success)' }}>
              {completedToday}
            </span>
          </div>
        </div>
      )}

      {/* List */}
      <TaskList
        tasks={todayTasks}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        onSelect={onSelect}
        emptyTitle="Nothing Due Today"
        emptyDescription="You don't have any items due on today's date. Click below to add a new task for today."
        onEmptyAction={onOpenCreateModal}
      />
    </div>
  );
}
