import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { tasks as initialTasks } from "../services/taskService";
import { STATUS } from "../constants/index.js";
import PropTypes from "prop-types";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });
  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const showToast = useCallback((message, undoAction = null) => {
    setToast({ message, undoAction });
    setTimeout(() => setToast(null), 5000);
  }, []);

  const hideToast = useCallback(() => setToast(null), []);

  const addTask = useCallback((newTask) => {
    const task = {
      ...newTask,
      id: Date.now(),
      status: STATUS.PENDING,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks((prev) => [...prev, task]);
  }, []);

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => {
        const taskToDelete = prev.find((t) => t.id === id);
        const newTasks = prev.filter((t) => t.id !== id);

        showToast("Task deleted", () => {
          setTasks((current) => [...current, taskToDelete]);
        });

        return newTasks;
      });
    },
    [showToast],
  );

  const updateTask = useCallback(
    (id, updatedData) => {
      setTasks((prev) => {
        const previousTask = prev.find((t) => t.id === id);
        const newTasks = prev.map((task) =>
          task.id === id ? { ...task, ...updatedData, id } : task,
        );

        showToast("✅ Task updated", () => {
          setTasks((current) =>
            current.map((task) => (task.id === id ? previousTask : task)),
          );
        });

        return newTasks;
      });
    },
    [showToast],
  );

  const updateTaskStatus = useCallback(
    (id, newStatus) => {
      setTasks((prev) => {
        const previousStatus = prev.find((t) => t.id === id)?.status;
        const newTasks = prev.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task,
        );

        showToast("Status updated", () => {
          setTasks((current) =>
            current.map((task) =>
              task.id === id ? { ...task, status: previousStatus } : task,
            ),
          );
        });

        return newTasks;
      });
    },
    [showToast],
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTaskStatus,
        updateTask,
        toast,
        showToast,
        hideToast,
      }}>
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTasks() {
  return useContext(TaskContext);
}
