import React from 'react';
import SearchBar from './SearchBar';
import { RotateCcw } from 'lucide-react';
import { VALID_PRIORITIES, VALID_CATEGORIES, VALID_STATUSES } from '../utils/validation';

/**
 * FilterPanel Component
 * Houses search bar, status, priority, category filters, sorting, and reset action.
 */
export default function FilterPanel({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory,
  sortBy,
  setSortBy,
  onResetFilters
}) {
  const isFiltered =
    search !== '' ||
    status !== 'ALL' ||
    priority !== 'ALL' ||
    category !== 'ALL' ||
    sortBy !== 'dueDate_asc';

  return (
    <div className="filter-search-panel">
      {/* Search Input */}
      <SearchBar
        value={search}
        onChange={setSearch}
        onClear={() => setSearch('')}
      />

      {/* Select Filters & Sort */}
      <div className="filters-row">
        {/* Status Filter */}
        <select
          className="filter-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by Status"
          id="filter-status-select"
        >
          <option value="ALL">All Statuses</option>
          {VALID_STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
          <option value="Overdue">Overdue</option>
        </select>

        {/* Priority Filter */}
        <select
          className="filter-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Filter by Priority"
          id="filter-priority-select"
        >
          <option value="ALL">All Priorities</option>
          {VALID_PRIORITIES.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by Category"
          id="filter-category-select"
        >
          <option value="ALL">All Categories</option>
          {VALID_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Sort Options */}
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort Tasks"
          id="filter-sort-select"
        >
          <option value="dueDate_asc">Sort: Due Date (Earliest)</option>
          <option value="dueDate_desc">Sort: Due Date (Latest)</option>
          <option value="priority_desc">Sort: Priority (Urgent first)</option>
          <option value="priority_asc">Sort: Priority (Low first)</option>
          <option value="createdAt_desc">Sort: Newest Created</option>
          <option value="createdAt_asc">Sort: Oldest Created</option>
        </select>

        {/* Clear Filters Button */}
        {isFiltered && (
          <button
            type="button"
            className="btn-clear-filters"
            onClick={onResetFilters}
            aria-label="Reset all filters"
            id="btn-clear-filters"
          >
            <RotateCcw size={14} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
