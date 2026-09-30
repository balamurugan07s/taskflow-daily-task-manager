import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileNavigation from './components/MobileNavigation';
import Footer from './components/Footer';
import TaskModal from './components/TaskModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import ConfirmationModal from './components/ConfirmationModal';
import Notification from './components/Notification';

import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks';
import TodayTasks from './pages/TodayTasks';
import Statistics from './pages/Statistics';

import { useTasks } from './hooks/useTasks';
import { getTodayDateString } from './utils/dateUtils';

/**
 * App Component
 * Core application orchestrator managing routes, global modal states,
 * notifications, and state synchronization.
 */
export default function App() {
  const {
    tasks,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    resetToSampleTasks
  } = useTasks();

  // Navigation & Theme States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskflow_theme') || 'light';
  });

  // Modal Dialog States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [inspectingTask, setInspectingTask] = useState(null);

  // Toast Notification State
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Synchronize Dark / Light Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskflow_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Task Form Actions
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingTask) {
      // Edit existing task
      const result = updateTask(editingTask.id, formData);
      if (result.success) {
        showNotification(`Task "${formData.title}" updated successfully!`);
        setIsTaskModalOpen(false);
        setEditingTask(null);
        // If inspecting same task, update inspect modal
        if (inspectingTask && inspectingTask.id === editingTask.id) {
          setInspectingTask(prev => ({ ...prev, ...formData, updatedAt: new Date().toISOString() }));
        }
      }
    } else {
      // Create new task
      const result = addTask(formData);
      if (result.success) {
        showNotification(`New task "${formData.title}" created successfully!`);
        setIsTaskModalOpen(false);
      }
    }
  };

  // Completion Toggle Action
  const handleToggleComplete = (taskId) => {
    const updated = toggleTaskCompletion(taskId);
    if (updated) {
      const isCompleted = updated.status === 'Completed';
      showNotification(
        isCompleted
          ? `Task marked as completed!`
          : `Task reopened and marked as pending.`,
        'success'
      );
      if (inspectingTask && inspectingTask.id === taskId) {
        setInspectingTask(updated);
      }
    }
  };

  // Delete Actions
  const handlePromptDelete = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      showNotification(`Task "${taskToDelete.title}" deleted successfully.`);
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
      if (inspectingTask && inspectingTask.id === taskToDelete.id) {
        setInspectingTask(null);
      }
    }
  };

  // Task Details Modal Action
  const handleSelectTask = (task) => {
    setInspectingTask(task);
  };

  // Reset to Sample Tasks Action
  const handleResetSample = () => {
    resetToSampleTasks();
    showNotification("Restored sample demo tasks successfully!");
  };

  // Calculate today's task count for navigation badge
  const todayDateStr = getTodayDateString();
  const todayTasksCount = tasks.filter((t) => t.dueDate === todayDateStr).length;

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        totalTasks={tasks.length}
        todayTasksCount={todayTasksCount}
      />

      {/* Main Layout Area */}
      <div className="layout-wrapper">
        <Navbar
          onOpenCreateModal={handleOpenCreateModal}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="main-content" id="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  tasks={tasks}
                  stats={stats}
                  onOpenCreateModal={handleOpenCreateModal}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleOpenEditModal}
                  onDelete={handlePromptDelete}
                  onSelect={handleSelectTask}
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <AllTasks
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleOpenEditModal}
                  onDelete={handlePromptDelete}
                  onSelect={handleSelectTask}
                  onOpenCreateModal={handleOpenCreateModal}
                />
              }
            />
            <Route
              path="/today"
              element={
                <TodayTasks
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleOpenEditModal}
                  onDelete={handlePromptDelete}
                  onSelect={handleSelectTask}
                  onOpenCreateModal={handleOpenCreateModal}
                />
              }
            />
            <Route
              path="/statistics"
              element={
                <Statistics
                  tasks={tasks}
                  stats={stats}
                  onResetToSampleTasks={handleResetSample}
                  onSelect={handleSelectTask}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation todayTasksCount={todayTasksCount} />

      {/* Add / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        initialTask={editingTask}
        onSubmit={handleFormSubmit}
      />

      {/* Task Details Inspector Modal */}
      <TaskDetailsModal
        isOpen={!!inspectingTask}
        task={inspectingTask}
        onClose={() => setInspectingTask(null)}
        onEdit={handleOpenEditModal}
        onDelete={handlePromptDelete}
        onToggleComplete={handleToggleComplete}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Task"
        message={
          taskToDelete
            ? `Are you sure you want to permanently delete "${taskToDelete.title}"? This will remove it from LocalStorage.`
            : "Are you sure you want to delete this task?"
        }
        confirmLabel="Delete Task"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
      />

      {/* Toast Notification Container */}
      <Notification
        notification={notification}
        onDismiss={() => setNotification(null)}
      />
    </div>
  );
}
