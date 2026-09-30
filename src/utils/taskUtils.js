import { isOverdue } from './dateUtils';

// Priority weight for sorting
const PRIORITY_WEIGHTS = {
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1
};

/**
 * Filter tasks by search query, status, priority, and category
 */
export const filterTasks = (tasks, { search = '', status = 'ALL', priority = 'ALL', category = 'ALL' }) => {
  return tasks.filter((task) => {
    // Search query matching title or description
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description ? task.description.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchDesc) return false;
    }

    // Status filter
    if (status !== 'ALL') {
      if (status === 'Overdue') {
        if (!isOverdue(task.dueDate, task.status)) return false;
      } else if (task.status !== status) {
        return false;
      }
    }

    // Priority filter
    if (priority !== 'ALL' && task.priority !== priority) {
      return false;
    }

    // Category filter
    if (category !== 'ALL' && task.category !== category) {
      return false;
    }

    return true;
  });
};

/**
 * Sort tasks by due date, priority, or creation date
 */
export const sortTasks = (tasks, sortBy = 'dueDate_asc') => {
  const sorted = [...tasks];

  switch (sortBy) {
    case 'dueDate_asc':
      return sorted.sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));
    case 'dueDate_desc':
      return sorted.sort((a, b) => (b.dueDate || '').localeCompare(a.dueDate || ''));
    case 'priority_desc':
      return sorted.sort((a, b) => (PRIORITY_WEIGHTS[b.priority] || 0) - (PRIORITY_WEIGHTS[a.priority] || 0));
    case 'priority_asc':
      return sorted.sort((a, b) => (PRIORITY_WEIGHTS[a.priority] || 0) - (PRIORITY_WEIGHTS[b.priority] || 0));
    case 'createdAt_desc':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'createdAt_asc':
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    default:
      return sorted;
  }
};

/**
 * Generate comprehensive dashboard and statistics metrics
 */
export const calculateTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = tasks.filter(t => t.status !== 'Completed').length;
  const overdue = tasks.filter(t => isOverdue(t.dueDate, t.status)).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Breakdown by priority
  const byPriority = {
    Urgent: tasks.filter(t => t.priority === 'Urgent').length,
    High: tasks.filter(t => t.priority === 'High').length,
    Medium: tasks.filter(t => t.priority === 'Medium').length,
    Low: tasks.filter(t => t.priority === 'Low').length
  };

  // Breakdown by category
  const categories = ['Work', 'Study', 'Personal', 'Health', 'Shopping', 'Other'];
  const byCategory = {};
  categories.forEach(cat => {
    byCategory[cat] = tasks.filter(t => t.category === cat).length;
  });

  return {
    total,
    completed,
    pending,
    overdue,
    percentage,
    byPriority,
    byCategory
  };
};

/**
 * Generate a unique task ID
 */
export const generateTaskId = () => {
  return `task-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
};
