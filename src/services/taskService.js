export const tasks = [
  {
    id: 2,
    title: "Build Navbar Component",
    description: "Create reusable navbar with routing and active link styling",
    status: "completed",
    priority: "medium",
    createdAt: "2026-04-01",
    dueDate: "2026-04-05",
  },
   {
    id: 4,
    title: "Add loading and error states",
    description: "Improve UX by handling loading, empty, and error UI states",
    status: "pending",
    priority: "medium",
    createdAt: "2026-03-22",
    dueDate: "2026-03-30",
  },
  {
    id: 5,
    title: "Refactor components structure",
    description: "Organize code into reusable and scalable components",
    status: "in-progress",
    priority: "low",
    createdAt: "2026-03-23",
    dueDate: "2026-04-20",
  },
];
export const getStats = () => {
  const total = tasks.length
  const completed = tasks.filter(t => t.status === "completed").length
  const pending =  tasks.filter(t => t.status === "pending").length
  const inProgress = tasks.filter(t => t.status === "in-progress").length

  return { total, completed, pending, inProgress }
}