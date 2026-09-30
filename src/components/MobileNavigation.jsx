import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, CalendarDays, BarChart3 } from 'lucide-react';

/**
 * MobileNavigation Component
 * Fixed bottom navigation bar for mobile devices.
 */
export default function MobileNavigation({ todayTasksCount = 0 }) {
  return (
    <nav className="mobile-navigation" aria-label="Mobile Navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
      >
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/tasks"
        className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
      >
        <CheckSquare size={20} />
        <span>All Tasks</span>
      </NavLink>

      <NavLink
        to="/today"
        className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
      >
        <CalendarDays size={20} />
        <span>Today</span>
        {todayTasksCount > 0 && (
          <span className="mobile-nav-badge">{todayTasksCount}</span>
        )}
      </NavLink>

      <NavLink
        to="/statistics"
        className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
      >
        <BarChart3 size={20} />
        <span>Stats</span>
      </NavLink>
    </nav>
  );
}
