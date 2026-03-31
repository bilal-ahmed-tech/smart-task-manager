import StatCard from "../components/ui/StatCard";
import TaskList from "../components/ui/TaskList";
import { useTasks } from "../context/TaskContext";
import {useTaskStats} from "../hooks/useTaskStats";
export default function Dashboard() {
  function getGreeting() {
    let time = new Date().getHours();
    if (time > 20 || time < 5) {
      return "Night";
    } else if (time > 17) {
      return "Evening";
    } else if (time >= 12) {
      return "Afternoon";
    } else {
      return "Morning";
    }
  }
  const { tasks, deleteTask } = useTasks();
  const stats = useTaskStats();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Good {getGreeting()} 👋
      </h1>
      <p className="text-gray-500 mt-1">Here's your task overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
        <StatCard title="Total" value={stats.total} color="blue" />
        <StatCard title="Completed" value={stats.completed} color="green" />
        <StatCard title="Pending" value={stats.pending} color="yellow" />
        <StatCard title="In Progress" value={stats.inProgress} color="purple" />
        <StatCard title="Overdue" value={stats.overdue} color="red" />
      </div>
      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}
