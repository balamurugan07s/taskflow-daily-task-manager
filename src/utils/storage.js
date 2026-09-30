import { sampleTasks } from '../data/sampleTasks';

export const STORAGE_KEY = 'taskflow_tasks';

/**
 * Get tasks from LocalStorage.
 * Loads sample tasks on initial application run.
 * Handles JSON parsing errors gracefully.
 */
export const getTasks = () => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      // First visit: initialize with curated sample tasks
      saveTasks(sampleTasks);
      return sampleTasks;
    }
    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : sampleTasks;
  } catch (error) {
    console.error("Failed to read tasks from LocalStorage:", error);
    return sampleTasks;
  }
};

/**
 * Save tasks array to LocalStorage.
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Failed to save tasks to LocalStorage:", error);
    return false;
  }
};

/**
 * Remove stored tasks from LocalStorage.
 */
export const clearTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear tasks from LocalStorage:", error);
    return false;
  }
};
