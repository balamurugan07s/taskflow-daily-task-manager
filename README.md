# TaskFlow – Daily Task Manager

A responsive, feature-rich daily task management web application built with **ReactJS (v19)**, **Vite**, **React Router (v7)**, **Lucide React**, and **Vanilla CSS3**.

Developed as an academic full-stack web development assignment demonstrating modern component architecture, state management hooks (`useState`, `useEffect`, `useMemo`, `useCallback`), custom hooks, client-side validation, LocalStorage persistence, multi-criteria filtering, and responsive design.

---

## 📋 Problem Statement

Students and busy individuals often struggle with daily task prioritization, missing deadlines, and keeping track of fragmented academic or personal deliverables. **TaskFlow** solves this problem by providing an intuitive, centralized dashboard with real-time progress indicators, categorization, priority tagging, and overdue alerts—all stored persistently in the user's browser without requiring complex backend servers.

---

## ✨ Features

- **Dashboard Overview**:
  - Live summary KPI cards: Total, Completed, Pending, and Overdue task counts.
  - Overall task completion efficiency progress bar.
  - Quick-view list of tasks scheduled for today with direct action buttons.
- **Task Management**:
  - **Add Task**: Custom modal with real-time client-side validation.
  - **Edit Task**: Pre-filled form with validation and updated timestamp.
  - **Delete Task**: Accessible confirmation modal preventing accidental deletions.
  - **Quick Completion**: Single-click checkbox toggling with visual strikethrough and timestamp tracking (`completedAt`).
  - **Inspect Task Details**: Detailed inspector modal showing full creation, update, and completion timestamps.
- **Search, Filter & Sorting**:
  - Real-time search across task title and description.
  - Multi-status filter: *All*, *Pending*, *In Progress*, *Completed*, and *Overdue*.
  - Priority filter: *Urgent*, *High*, *Medium*, *Low*.
  - Category filter: *Work*, *Study*, *Personal*, *Health*, *Shopping*, *Other*.
  - Multi-direction sorting: by Due Date (*Earliest / Latest*), Priority (*Urgent first / Low first*), or Creation Date (*Newest / Oldest*).
  - One-click *Clear Filters* action.
- **Today's Focus View**:
  - Filtered view exclusively isolating tasks due on the current calendar date.
- **Productivity & Analytics View**:
  - Distribution breakdown by category and priority with visual percentage meters.
  - Recent task activity list with click-to-inspect modal.
  - Demo reset button to restore default sample tasks at any time.
- **Design & UX**:
  - Sleek Indigo/Violet theme with modern glassmorphism and subtle elevation.
  - Full **Dark Mode** & **Light Mode** toggle with instant persistence.
  - Responsive layout: desktop fixed sidebar, tablet adaptive grid, mobile collapsible menu, and mobile bottom navigation bar.
  - Toast notifications for add, edit, complete, and delete actions.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **ReactJS 19** | Functional components, Hooks, and JSX UI rendering |
| **Vite 8** | Modern, blazing-fast bundler and development server |
| **React Router 7** | Client-side routing (`/`, `/tasks`, `/today`, `/statistics`) |
| **Vanilla CSS3** | Custom properties (CSS variables), Flexbox, CSS Grid, media queries |
| **Lucide React** | Crisp, lightweight SVG iconography |
| **LocalStorage API** | Browser-level JSON data persistence (`taskflow_tasks`) |

---

## 📁 Project Folder Structure

```text
├── index.html                  # HTML entry point with Google Fonts & SEO tags
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
└── src/
    ├── components/             # Reusable UI components
    │   ├── ConfirmationModal.jsx   # Delete confirmation modal dialog
    │   ├── EmptyState.jsx          # Friendly fallback illustration & action
    │   ├── FilterPanel.jsx         # Search, dropdown filters, & sort controls
    │   ├── Footer.jsx              # Project footer & credits
    │   ├── MobileNavigation.jsx    # Responsive mobile bottom navigation bar
    │   ├── Navbar.jsx              # Top header with date & theme switcher
    │   ├── Notification.jsx        # Toast banner alerts for CRUD feedback
    │   ├── PriorityBadge.jsx       # Color-coded priority pill indicator
    │   ├── ProgressBar.jsx         # Task completion percentage bar
    │   ├── SearchBar.jsx           # Accessible search input field
    │   ├── Sidebar.jsx             # Left desktop navigation panel
    │   ├── StatisticsCard.jsx      # Reusable KPI counter widget
    │   ├── StatusBadge.jsx         # Status pill with colored dot
    │   ├── TaskCard.jsx            # Individual task card with actions
    │   ├── TaskDetailsModal.jsx    # Detailed task metadata inspector
    │   ├── TaskForm.jsx            # Validated form for Add & Edit operations
    │   ├── TaskList.jsx            # Responsive task grid wrapper
    │   └── TaskModal.jsx           # Modal dialog wrapper for TaskForm
    ├── data/
    │   └── sampleTasks.js          # Curated initial tasks dataset
    ├── hooks/
    │   ├── useLocalStorage.js      # Custom hook for localStorage syncing
    │   └── useTasks.js             # Task state manager hook (CRUD & stats)
    ├── pages/
    │   ├── AllTasks.jsx            # Filterable task directory view
    │   ├── Dashboard.jsx           # Main overview with KPI cards & today's list
    │   ├── Statistics.jsx          # Category & priority analytics view
    │   └── TodayTasks.jsx          # Focus view for today's due tasks
    ├── styles/
    │   ├── components.css          # Styles for cards, modals, badges, inputs
    │   ├── global.css              # CSS variables, typography, reset, dark mode
    │   └── layout.css              # App shell, responsive breakpoints, sidebar
    ├── utils/
    │   ├── dateUtils.js            # Relative date formatting & overdue checks
    │   ├── storage.js              # LocalStorage read/write/clear helpers
    │   ├── taskUtils.js            # Filtering, sorting, and stats math
    │   └── validation.js           # Client-side form validation rules
    ├── App.jsx                     # Root router shell and modal coordinator
    └── main.jsx                    # React DOM entry point
```

---

## 💾 LocalStorage Persistence

Task data is stored under the LocalStorage key:
```text
taskflow_tasks
```

### Data Flow
1. On initial load, [storage.js](file:///c:/Users/BALA/Desktop/CAREER/Work/antigravity%20ide%20work/assaignment/src/utils/storage.js) checks `localStorage.getItem('taskflow_tasks')`.
2. If empty, it seeds the application with the 7 realistic items in [sampleTasks.js](file:///c:/Users/BALA/Desktop/CAREER/Work/antigravity%20ide%20work/assaignment/src/data/sampleTasks.js).
3. Any create, edit, delete, or completion change triggers [useTasks.js](file:///c:/Users/BALA/Desktop/CAREER/Work/antigravity%20ide%20work/assaignment/src/hooks/useTasks.js), automatically updating React state and serializing the updated array to LocalStorage.
4. Refreshing the browser preserves all changes.

---

## 🚀 Installation & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open in your browser**:
   Navigate to the local address displayed in your terminal (typically `http://localhost:3000`).

> **Note for Windows PowerShell users:** If script execution is disabled on your system, execute npm via `.cmd`:
> ```powershell
> npm.cmd install
> npm.cmd run dev
> ```

---

## 🎓 Live Evaluation & Demonstration Guide

To demonstrate the application during an evaluation or viva, follow this 11-step sequence:

1. **Dashboard Overview**: Open `http://localhost:3000`. Point out the live KPI cards (*Total, Completed, Pending, Overdue*) and the animated progress bar.
2. **Explain Data Structure**: Show that tasks due today appear under the *Today's Tasks* section on the dashboard.
3. **Trigger Validation Error**: Click **"Create New Task"**, leave the form empty, and click **"Create Task"**. Point out the client-side error messages beside the required fields (*Title*, *Due Date*).
4. **Add a Valid Task**: Type a title with at least 3 characters, set a due date, pick a priority (*e.g., Urgent*), choose a category (*e.g., Study*), and submit. Observe the green success toast notification and instant card insertion.
5. **Inspect Task Metadata**: Click on the newly created task card to open the **Task Details Modal**, displaying creation timestamp, status, priority, and due date.
6. **Edit the Task**: Click the **Edit** (pencil) icon, change the priority or description, and save. Confirm the card updates immediately.
7. **Complete a Task**: Click the checkbox on the task card. Notice the checkmark, strikethrough text styling, and the immediate recalculation of the completion progress bar.
8. **Navigate to "All Tasks"**: Test the real-time search bar by typing a keyword. Filter by priority (*e.g., "Urgent"*), status, or sort by creation date. Click **Clear Filters** to reset.
9. **Check "Today's Focus"**: Click *Today's Tasks* in the sidebar or mobile nav to verify only tasks due today appear.
10. **Delete with Confirmation**: Click the **Delete** (trash) icon on a task. Show the accessible confirmation modal, confirm deletion, and watch the list update.
11. **Browser Refresh Demonstration**: Refresh the browser page (`F5`) to prove that all changes persist in **LocalStorage**. Toggle the Dark/Light mode button to show theme persistence.

---

## 🔮 Future Enhancements

- Cloud sync with Node.js & MongoDB / PostgreSQL backend.
- Drag-and-drop task reordering using `@hello-pangea/dnd`.
- Export & Import tasks via JSON and CSV files.
- Desktop browser push notifications for approaching deadlines.

---

## 👤 Author Information

- **Project**: TaskFlow – Daily Task Manager
- **Course**: Full-Stack Web Development
- **Demonstration**: React Functional Components, Hooks, JSX, Client-side Validation, LocalStorage, and Responsive CSS.
