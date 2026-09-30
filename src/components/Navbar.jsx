import React from 'react';
import { Calendar, Plus, Moon, Sun, Menu, X } from 'lucide-react';

/**
 * Navbar Component
 * Displays current date, theme toggle, quick action button, and mobile menu trigger.
 */
export default function Navbar({ onOpenCreateModal, isMobileMenuOpen, setIsMobileMenuOpen, theme, toggleTheme }) {
  // Format current date nicely: e.g. "Tuesday, Sep 29, 2026"
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="navbar-date-display">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="navbar-right">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={onOpenCreateModal}
          className="btn-primary-action"
          aria-label="Create New Task"
          id="btn-create-task-navbar"
        >
          <Plus size={18} />
          <span className="btn-text-responsive">Create New Task</span>
        </button>
      </div>
    </header>
  );
}
