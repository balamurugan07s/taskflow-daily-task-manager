import React from 'react';

/**
 * ProgressBar Component
 * Shows visual task completion percentage and animated track.
 */
export default function ProgressBar({
  percentage = 0,
  title = "Overall Completion Rate",
  showLabel = true,
  height = "12px"
}) {
  const safePercentage = Math.min(Math.max(Math.round(percentage), 0), 100);

  return (
    <div className="progress-card">
      {showLabel && (
        <div className="progress-header">
          <span className="progress-title">{title}</span>
          <span className="progress-percentage">{safePercentage}%</span>
        </div>
      )}
      <div
        className="progress-bar-track"
        style={{ height }}
        role="progressbar"
        aria-valuenow={safePercentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={title}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${safePercentage}%` }}
        />
      </div>
    </div>
  );
}
