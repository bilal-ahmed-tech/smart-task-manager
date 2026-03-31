import { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import { STATUS } from "../constants";
export  function useTaskStats() {
  const { tasks } = useTasks();
    const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === STATUS.COMPLETED).length;
    const pending = tasks.filter((task) => task.status === STATUS.PENDING).length;
    const inProgress = tasks.filter((task) => task.status === STATUS.IN_PROGRESS).length;
    const overdue = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0); // Normalize to start of day
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Set time to the start of the day for accurate comparison
      return task.status !== STATUS.COMPLETED && dueDate < now;
    }).length;
    return { total, completed, pending, inProgress, overdue };
  }, [tasks]);
  return stats;
}