import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  PieChart
} from 'lucide-react';
import StatisticsCard from '../components/StatisticsCard';
import ProgressBar from '../components/ProgressBar';
import PriorityBadge from '../components/PriorityBadge';
import StatusBadge from '../components/StatusBadge';
import { formatDisplayDate } from '../utils/dateUtils';

/**
 * Statistics View
 * Visual analytics, distribution by priority & category, productivity progress, and data reset.
 */
export default function Statistics({
  tasks = [],
  stats,
  onResetToSampleTasks,
  onSelect
}) {
  const priorities = ['Urgent', 'High', 'Medium', 'Low'];
  const categories = ['Work', 'Study', 'Personal', 'Health', 'Shopping', 'Other'];

  return (
    <div className="statistics-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Productivity & Statistics</h1>
          <p className="page-subtitle">
            Comprehensive metrics and distribution of your tasks.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetToSampleTasks}
          className="btn-secondary"
          title="Restore sample demo data for evaluation"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <RotateCcw size={15} />
          <span>Reload Sample Data</span>
        </button>
      </div>

      {/* Main KPI Cards */}
      <div className="stats-grid">
        <StatisticsCard
          label="Total Tasks"
          value={stats.total}
          type="total"
          icon={<Layers size={24} />}
        />
        <StatisticsCard
          label="Completed"
          value={stats.completed}
          type="completed"
          icon={<CheckCircle2 size={24} />}
        />
        <StatisticsCard
          label="Pending / In Progress"
          value={stats.pending}
          type="pending"
          icon={<Clock size={24} />}
        />
        <StatisticsCard
          label="Overdue Actions"
          value={stats.overdue}
          type="overdue"
          icon={<AlertTriangle size={24} />}
        />
      </div>

      {/* Overall Progress */}
      <ProgressBar
        percentage={stats.percentage}
        title="Overall Task Completion Efficiency"
      />

      {/* Breakdown Grids */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginTop: '1.5rem'
      }}>
        {/* Category Distribution */}
        <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <PieChart size={18} color="var(--primary-600)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Distribution by Category</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {categories.map((cat) => {
              const count = stats.byCategory[cat] || 0;
              const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600 }}>{cat}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{count} tasks ({pct}%)</span>
                  </div>
                  <div className="progress-bar-track" style={{ height: '8px' }}>
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${pct}%`, background: 'var(--primary-gradient)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <BarChart3 size={18} color="var(--color-warning)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Distribution by Priority</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {priorities.map((prio) => {
              const count = stats.byPriority[prio] || 0;
              const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={prio}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600 }}>{prio}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{count} tasks ({pct}%)</span>
                  </div>
                  <div className="progress-bar-track" style={{ height: '8px' }}>
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background:
                          prio === 'Urgent' ? 'var(--color-danger)' :
                          prio === 'High' ? 'var(--priority-high)' :
                          prio === 'Medium' ? 'var(--priority-medium)' : 'var(--priority-low)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Tasks Inspection List */}
      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
          Recent Task Activity (Click to inspect details)
        </h2>
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}>
          {tasks.slice(0, 5).map((t, index) => (
            <div
              key={t.id}
              onClick={() => onSelect(t)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 1.25rem',
                borderBottom: index < 4 ? '1px solid var(--border-subtle)' : 'none',
                cursor: 'pointer',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface-muted)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <PriorityBadge priority={t.priority} />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <StatusBadge status={t.status} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Due: {formatDisplayDate(t.dueDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
