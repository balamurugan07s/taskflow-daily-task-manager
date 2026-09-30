/**
 * TaskFlow - Sample Initial Task Data
 * Demonstrates a variety of priorities, categories, and statuses.
 * Includes tasks due today (2026-09-29), overdue tasks, and future tasks.
 */

// Helper to get formatted ISO date string YYYY-MM-DD
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const sampleTasks = [
  {
    id: "task-001",
    title: "Complete React Full-Stack Assignment",
    description: "Build TaskFlow daily task manager with responsive UI, LocalStorage, hooks, and presentation slides.",
    dueDate: "2026-09-29", // Due today
    priority: "Urgent",
    category: "Study",
    status: "In Progress",
    createdAt: "2026-09-28T09:00:00.000Z",
    updatedAt: "2026-09-29T08:30:00.000Z",
    completedAt: null
  },
  {
    id: "task-002",
    title: "Submit Literature Survey Report",
    description: "Finalize bibliography and upload report guidelines document for academic review.",
    dueDate: "2026-09-26", // Overdue
    priority: "High",
    category: "Study",
    status: "Pending",
    createdAt: "2026-09-24T11:15:00.000Z",
    updatedAt: "2026-09-25T14:20:00.000Z",
    completedAt: null
  },
  {
    id: "task-003",
    title: "Morning 5K Jog & Stretching",
    description: "Maintain physical wellness routine and log hydration metrics in health tracker.",
    dueDate: "2026-09-29", // Due today
    priority: "Medium",
    category: "Health",
    status: "Completed",
    createdAt: "2026-09-29T06:00:00.000Z",
    updatedAt: "2026-09-29T07:15:00.000Z",
    completedAt: "2026-09-29T07:15:00.000Z"
  },
  {
    id: "task-004",
    title: "Team Sprint Planning Meeting",
    description: "Review current backlog, estimate story points, and assign deliverables for sprint cycle 14.",
    dueDate: "2026-09-30",
    priority: "High",
    category: "Work",
    status: "Pending",
    createdAt: "2026-09-28T16:00:00.000Z",
    updatedAt: "2026-09-28T16:00:00.000Z",
    completedAt: null
  },
  {
    id: "task-005",
    title: "Weekly Grocery & Meal Prep",
    description: "Purchase fresh vegetables, fruits, whole grains, and dairy essentials for the week.",
    dueDate: "2026-10-02",
    priority: "Low",
    category: "Shopping",
    status: "Pending",
    createdAt: "2026-09-27T18:45:00.000Z",
    updatedAt: "2026-09-27T18:45:00.000Z",
    completedAt: null
  },
  {
    id: "task-006",
    title: "Renew Domain & Cloud Hosting",
    description: "Check SSL certificates and process annual renewal for developer portfolio server.",
    dueDate: "2026-10-05",
    priority: "Medium",
    category: "Personal",
    status: "Pending",
    createdAt: "2026-09-25T12:00:00.000Z",
    updatedAt: "2026-09-25T12:00:00.000Z",
    completedAt: null
  },
  {
    id: "task-007",
    title: "Inspect Project Linting & Formatting",
    description: "Run ESLint and clean up code comments across all reusable components.",
    dueDate: "2026-09-27", // Overdue
    priority: "Low",
    category: "Work",
    status: "Completed",
    createdAt: "2026-09-26T10:00:00.000Z",
    updatedAt: "2026-09-27T17:00:00.000Z",
    completedAt: "2026-09-27T17:00:00.000Z"
  }
];
