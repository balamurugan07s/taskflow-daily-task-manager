import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ListTodo, Plus, Calendar, Sparkles } from 'lucide-react';
import StatisticsCard from '../components/StatisticsCard';
import ProgressBar from '../components/ProgressBar';
import TaskList from '../components/TaskList';
import { getTodayDateString, formatDisplayDate } from '../utils/dateUtils';

/**
 * Dashboard View
 * Executive summary of daily productivity, KPI statistics, progress bar, and today's schedule.
 */
export default function Dashboard({
  tasks = [],
  stats,
  onOpenCreateModal,
  onToggleComplete,
  onEdit,
  onDelete,
  onSelect
}) {
  const todayDateStr = getTodayDateString();
  const formattedToday = formatDisplayDate(todayDateStr);

  // Filter tasks due today
  const todayTasks = tasks.filter(t => t.dueDate === todayDateStr);

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-priority-high" style={{ padding: '0.2rem 0.6rem' }}>
              <Calendar size={13} />
              <span>{formattedToday}</span>
            </span>
            <span className="badge" style={{ background: 'var(--primary-50)', color: 'var(--primary-600)' }}>
              <Sparkles size={13} />
              <span>Daily Workspace</span>
            </span>
          </div>
          <h1 className="page-title">TaskFlow Dashboard</h1>
          <p className="page-subtitle">
            Welcome! Manage, organize, and accomplish your daily academic and personal goals.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="btn-primary-action"
          id="btn-dashboard-new-task"
        >
          <Plus size={18} />
          <span>Create New Task</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <StatisticsCard
          label="Total Tasks"
          value={stats.total}
          type="total"
          icon={<ListTodo size={24} />}
        />
        <StatisticsCard
          label="Completed"
          value={stats.completed}
          type="completed"
          icon={<CheckCircle2 size={24} />}
        />
        <StatisticsCard
          label="Pending"
          value={stats.pending}
          type="pending"
          icon={<Clock size={24} />}
        />
        <StatisticsCard
          label="Overdue"
          value={stats.overdue}
          type="overdue"
          icon={<AlertTriangle size={24} />}
        />
      </div>

      {/* Progress Bar Widget */}
      <ProgressBar
        percentage={stats.percentage}
        title="Daily Completion Progress"
      />

      {/* Today's Tasks Section */}
      <div style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Today's Tasks ({todayTasks.length})</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Focused priorities scheduled for today ({formattedToday}).
            </p>
          </div>
          {todayTasks.length > 0 && (
            <button
              onClick={onOpenCreateModal}
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
            >
              + Add for Today
            </button>
          )}
        </div>

        <TaskList
          tasks={todayTasks}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
          emptyTitle="No Tasks Scheduled for Today"
          emptyDescription="Great job! You have no pending obligations for today. Click below to add a new task or review All Tasks."
          onEmptyAction={onOpenCreateModal}
        />
      </div>
    </div>
  );
}
