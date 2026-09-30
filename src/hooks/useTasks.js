import { useState, useEffect, useMemo, useCallback } from 'react';
import { getTasks, saveTasks } from '../utils/storage';
import { sampleTasks } from '../data/sampleTasks';
import { calculateTaskStats, generateTaskId } from '../utils/taskUtils';
import { validateTask } from '../utils/validation';

/**
 * Custom hook to manage full TaskFlow task lifecycle:
 * Fetch, Add, Edit, Delete, Toggle Complete, and Statistics.
 */
export function useTasks() {
  const [tasks, setTasks] = useState(() => getTasks());

  // Save whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add new task
  const addTask = useCallback((taskData) => {
    const validation = validateTask(taskData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const now = new Date().toISOString();
    const newTask = {
      id: generateTaskId(),
      title: taskData.title.trim(),
      description: taskData.description ? taskData.description.trim() : '',
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      category: taskData.category,
      status: taskData.status || 'Pending',
      createdAt: now,
      updatedAt: now,
      completedAt: taskData.status === 'Completed' ? now : null
    };

    setTasks(prev => [newTask, ...prev]);
    return { success: true, task: newTask };
  }, []);

  // Update existing task
  const updateTask = useCallback((taskId, updatedFields) => {
    const validation = validateTask(updatedFields);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const now = new Date().toISOString();

    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;

        const isBecomingCompleted = updatedFields.status === 'Completed' && task.status !== 'Completed';
        const isBecomingUncompleted = updatedFields.status !== 'Completed' && task.status === 'Completed';

        let newCompletedAt = task.completedAt;
        if (isBecomingCompleted) {
          newCompletedAt = now;
        } else if (isBecomingUncompleted) {
          newCompletedAt = null;
        }

        return {
          ...task,
          title: updatedFields.title.trim(),
          description: updatedFields.description ? updatedFields.description.trim() : '',
          dueDate: updatedFields.dueDate,
          priority: updatedFields.priority,
          category: updatedFields.category,
          status: updatedFields.status,
          updatedAt: now,
          completedAt: newCompletedAt
        };
      })
    );

    return { success: true };
  }, []);

  // Delete a task
  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    return { success: true };
  }, []);

  // Quick toggle completion status
  const toggleTaskCompletion = useCallback((taskId) => {
    const now = new Date().toISOString();
    let updatedTask = null;

    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;

        const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        const nextCompletedAt = nextStatus === 'Completed' ? now : null;

        updatedTask = {
          ...task,
          status: nextStatus,
          updatedAt: now,
          completedAt: nextCompletedAt
        };

        return updatedTask;
      })
    );

    return updatedTask;
  }, []);

  // Reset to default sample tasks (useful for testing and evaluation)
  const resetToSampleTasks = useCallback(() => {
    setTasks(sampleTasks);
    saveTasks(sampleTasks);
  }, []);

  // Memoized task statistics
  const stats = useMemo(() => calculateTaskStats(tasks), [tasks]);

  return {
    tasks,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    resetToSampleTasks
  };
}
