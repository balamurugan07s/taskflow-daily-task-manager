import React from 'react';
import { AlertCircle, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

/**
 * PriorityBadge Component
 * Renders priority level with appropriate icon and color theme.
 */
export default function PriorityBadge({ priority }) {
  const normalizedPriority = priority ? priority.toLowerCase() : 'low';

  const renderIcon = () => {
    switch (priority) {
      case 'Urgent':
        return <AlertCircle size={12} />;
      case 'High':
        return <ArrowUp size={12} />;
      case 'Medium':
        return <ArrowRight size={12} />;
      case 'Low':
        return <ArrowDown size={12} />;
      default:
        return null;
    }
  };

  return (
    <span className={`badge badge-priority-${normalizedPriority}`}>
      {renderIcon()}
      <span>{priority || 'Low'}</span>
    </span>
  );
}
