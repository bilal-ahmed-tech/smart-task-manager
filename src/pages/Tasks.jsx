import { useState, useEffect, useMemo } from "react";
import TaskList from "../components/ui/TaskList";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import Button from "../components/ui/Button";
import { PRIORITY } from "../constants";
export default function Tasks() {
  const navigate = useNavigate();
  const { tasks, deleteTask } = useTasks();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("dueDate");
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesFilter = filter === "all" || task.status === filter;
        const matchesSearch =
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sort === "dueDate") {
          // compare a.dueDate and b.dueDate
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return dateA - dateB; // sort ascending
        }
        if (sort === "priority") {
          // we'll handle this after
          const priorityMap = {
            [PRIORITY.HIGH]: 3,
            [PRIORITY.MEDIUM]: 2,
            [PRIORITY.LOW]: 1,
          };
          return priorityMap[b.priority] - priorityMap[a.priority]; // high first
        }
      });
  }, [tasks, filter, search, sort]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Handle loading state
  if (loading) return <Spinner />;

  // Handle error state
  if (error)
    return (
      <div className="max-w-5xl mx-auto py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );

  // Main return — everything here
  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Tasks</h1>
          <p className="text-gray-500 mt-1">Manage and track your tasks</p>
        </div>
        <Button onClick={() => navigate("/tasks/add")}>+ Add Task</Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex sm:justify-start justify-center flex-wrap gap-2 mt-3">
        {["all", "pending", "in-progress", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg  cursor-pointer text-sm font-medium transition capitalize
            ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}>
            {f}
          </button>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        {/* search input here */}
        <input
          type="text"
          value={search}
          name="search"
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />
        {/* select dropdown here */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="mt-3 px-4 cursor-pointer py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="dueDate" className="cursor-pointer">
            Sort by Due Date
          </option>
          <option value="priority" className="cursor-pointer">
            Sort by Priority
          </option>
        </select>
      </div>

      {/* Empty Filter State */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          message={
            filter === "all" ? "No tasks found" : `No ${filter} tasks found`
          }
          subMessage={
            filter === "all"
              ? "Create your first task to get started"
              : "Try a different filter or add a new task"
          }
        />
      ) : (
        <TaskList tasks={filteredTasks} onDelete={deleteTask} />
      )}
    </div>
  );
}
