import React, { useState, useMemo } from 'react';
import FilterPanel from '../components/FilterPanel';
import TaskList from '../components/TaskList';
import { filterTasks, sortTasks } from '../utils/taskUtils';

/**
 * AllTasks View
 * Comprehensive task management center with real-time multi-facet filtering, searching, and sorting.
 */
export default function AllTasks({
  tasks = [],
  onToggleComplete,
  onEdit,
  onDelete,
  onSelect,
  onOpenCreateModal
}) {
  // Filter & Search states
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [priority, setPriority] = useState('ALL');
  const [category, setCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('dueDate_asc');

  // Reset all filters
  const handleResetFilters = () => {
    setSearch('');
    setStatus('ALL');
    setPriority('ALL');
    setCategory('ALL');
    setSortBy('dueDate_asc');
  };

  // Filter & Sort tasks using useMemo for high performance
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, { search, status, priority, category });
    return sortTasks(filtered, sortBy);
  }, [tasks, search, status, priority, category, sortBy]);

  const hasActiveFilters =
    search !== '' ||
    status !== 'ALL' ||
    priority !== 'ALL' ||
    category !== 'ALL';

  return (
    <div className="all-tasks-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Tasks</h1>
          <p className="page-subtitle">
            Showing {filteredAndSortedTasks.length} of {tasks.length} total tasks.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="btn-primary-action"
          id="btn-all-tasks-new-task"
        >
          <span>+ New Task</span>
        </button>
      </div>

      {/* Filter, Search, and Sort Controls */}
      <FilterPanel
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetFilters={handleResetFilters}
      />

      {/* Task List / Cards Grid */}
      <TaskList
        tasks={filteredAndSortedTasks}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        onSelect={onSelect}
        emptyTitle={hasActiveFilters ? "No Tasks Match Your Filters" : "No Tasks Found"}
        emptyDescription={
          hasActiveFilters
            ? "Try loosening your search keywords or clearing status and priority filters."
            : "Your task collection is empty. Click below to add your very first daily task."
        }
        onEmptyAction={hasActiveFilters ? handleResetFilters : onOpenCreateModal}
      />
    </div>
  );
}
