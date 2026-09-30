/**
 * Date utility functions for TaskFlow
 */

// Returns local YYYY-MM-DD string
export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Formats a date string to readable format e.g. "Sep 29, 2026"
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  // If YYYY-MM-DD, create date with local components to avoid timezone shift
  if (typeof dateStr === 'string' && dateStr.length === 10 && dateStr.includes('-')) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
};

// Formats timestamp with time e.g. "Sep 29, 2026, 10:15 AM"
export const formatDisplayDateTime = (isoStr) => {
  if (!isoStr) return 'N/A';
  const date = new Date(isoStr);
  return isNaN(date.getTime())
    ? isoStr
    : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
};

// Checks if a task is overdue
export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'Completed') return false;
  const today = getTodayDateString();
  return dueDate < today;
};

// Checks if a task is due today
export const isDueToday = (dueDate) => {
  if (!dueDate) return false;
  const today = getTodayDateString();
  return dueDate === today;
};

// Human friendly relative due indicator
export const getRelativeDueLabel = (dueDate, status) => {
  if (status === 'Completed') return 'Completed';
  if (!dueDate) return '';

  const today = getTodayDateString();
  if (dueDate === today) return 'Due Today';

  const [tY, tM, tD] = today.split('-').map(Number);
  const [dY, dM, dD] = dueDate.split('-').map(Number);

  const todayDate = new Date(tY, tM - 1, tD);
  const taskDate = new Date(dY, dM - 1, dD);
  const diffTime = taskDate.getTime() - todayDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Due Tomorrow';
  if (diffDays === -1) return '1 day overdue';
  if (diffDays < -1) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays > 1 && diffDays <= 7) return `Due in ${diffDays} days`;

  return formatDisplayDate(dueDate);
};
