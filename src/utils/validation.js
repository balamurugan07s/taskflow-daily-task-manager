/**
 * Client-side validation utility for TaskFlow
 */

export const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
export const VALID_CATEGORIES = ['Work', 'Study', 'Personal', 'Health', 'Shopping', 'Other'];
export const VALID_STATUSES = ['Pending', 'In Progress', 'Completed'];

/**
 * Validates a single field or entire task object.
 * Returns an errors object where keys are field names.
 */
export const validateTask = (task) => {
  const errors = {};

  // Title validation
  if (!task.title || !task.title.trim()) {
    errors.title = 'Task title is required.';
  } else if (task.title.trim().length < 3) {
    errors.title = 'Task title must contain at least 3 characters.';
  } else if (task.title.trim().length > 80) {
    errors.title = 'Task title must not exceed 80 characters.';
  }

  // Description validation (optional, max 300 chars)
  if (task.description && task.description.length > 300) {
    errors.description = 'Description must not exceed 300 characters.';
  }

  // Due Date validation
  if (!task.dueDate) {
    errors.dueDate = 'Please select a due date.';
  } else {
    const parsed = Date.parse(task.dueDate);
    if (isNaN(parsed)) {
      errors.dueDate = 'Please provide a valid date.';
    }
  }

  // Priority validation
  if (!task.priority) {
    errors.priority = 'Please select a priority.';
  } else if (!VALID_PRIORITIES.includes(task.priority)) {
    errors.priority = 'Invalid priority selected.';
  }

  // Category validation
  if (!task.category) {
    errors.category = 'Please select a category.';
  } else if (!VALID_CATEGORIES.includes(task.category)) {
    errors.category = 'Invalid category selected.';
  }

  // Status validation
  if (!task.status) {
    errors.status = 'Please select a status.';
  } else if (!VALID_STATUSES.includes(task.status)) {
    errors.status = 'Invalid status selected.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates a single field for real-time feedback
 */
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'title':
      if (!value || !value.trim()) return 'Task title is required.';
      if (value.trim().length < 3) return 'Task title must contain at least 3 characters.';
      if (value.trim().length > 80) return 'Task title must not exceed 80 characters.';
      return '';

    case 'description':
      if (value && value.length > 300) return 'Description must not exceed 300 characters.';
      return '';

    case 'dueDate':
      if (!value) return 'Please select a due date.';
      if (isNaN(Date.parse(value))) return 'Please provide a valid date.';
      return '';

    case 'priority':
      if (!value) return 'Please select a priority.';
      if (!VALID_PRIORITIES.includes(value)) return 'Invalid priority selected.';
      return '';

    case 'category':
      if (!value) return 'Please select a category.';
      if (!VALID_CATEGORIES.includes(value)) return 'Invalid category selected.';
      return '';

    case 'status':
      if (!value) return 'Please select a status.';
      if (!VALID_STATUSES.includes(value)) return 'Invalid status selected.';
      return '';

    default:
      return '';
  }
};
