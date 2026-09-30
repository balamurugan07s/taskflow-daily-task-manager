import React from 'react';

/**
 * StatusBadge Component
 * Renders status with styled pill and dot indicator.
 */
export default function StatusBadge({ status }) {
  const normalizedStatus = status ? status.toLowerCase().replace(/\s+/g, '-') : 'pending';

  return (
    <span className={`badge badge-status-${normalizedStatus}`}>
      <span className="badge-dot" />
      <span>{status || 'Pending'}</span>
    </span>
  );
}
