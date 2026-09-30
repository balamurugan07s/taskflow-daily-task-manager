import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component
 * Search input with search icon, clear button, and accessible keyboard support.
 */
export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search tasks by title or description..."
}) {
  return (
    <div className="search-input-wrapper">
      <Search size={18} className="search-icon" aria-hidden="true" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
        id="task-search-input"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="action-icon-btn"
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px'
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
