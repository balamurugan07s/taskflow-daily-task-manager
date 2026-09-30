import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, CalendarDays, BarChart3, CheckCircle2, User } from 'lucide-react';

/**
 * Sidebar Component
 * Left navigation panel for desktop screens and collapsible drawer on mobile.
 */
export default function Sidebar({ isOpen, onClose, totalTasks = 0, todayTasksCount = 0 }) {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      badge: null
    },
    {
      to: '/tasks',
      label: 'All Tasks',
      icon: <CheckSquare size={20} />,
      badge: totalTasks > 0 ? totalTasks : null
    },
    {
      to: '/today',
      label: "Today's Tasks",
      icon: <CalendarDays size={20} />,
      badge: todayTasksCount > 0 ? todayTasksCount : null
    },
    {
      to: '/statistics',
      label: 'Statistics',
      icon: <BarChart3 size={20} />,
      badge: null
    }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-icon-wrapper">
            <CheckCircle2 size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">TaskFlow</span>
            <span className="brand-subtitle">Daily Task Manager</span>
          </div>
        </div>

        <div className="sidebar-content">
          <div>
            <div className="sidebar-section-title">Navigation</div>
            <nav className="sidebar-nav-list">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <div className="sidebar-link-content">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-quick-profile">
            <div className="user-avatar">
              <User size={18} />
            </div>
            <div className="user-info">
              <span className="user-name">Student Evaluator</span>
              <span className="user-role">React Full-Stack Demo</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
