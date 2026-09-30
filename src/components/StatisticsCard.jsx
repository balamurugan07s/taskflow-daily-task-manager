import React from 'react';

/**
 * StatisticsCard Component
 * Displays a single metric with icon, label, and value.
 */
export default function StatisticsCard({
  label,
  value,
  icon,
  type = 'total',
  onClick
}) {
  return (
    <div
      className="stat-card"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    >
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
      <div className={`stat-icon-wrapper stat-icon-${type}`}>
        {icon}
      </div>
    </div>
  );
}
