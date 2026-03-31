import { Link, NavLink } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";
import { STATUS } from "../../constants";

export default function Navbar() {
  const { tasks } = useTasks();
  const pendingCount = tasks.filter((t) => t.status === STATUS.PENDING).length;
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold md:text-base"
      : "text-gray-600 hover:text-blue-500 md:text-base";

  return (
    <nav className="bg-white shadow-md sticky top-0">
      <div className="max-w-5xl mx-auto px-4 py-2 md:py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          <div className="flex items-center">
            <img
              src="/favicon.ico"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 md:h-8 mr-2"
            />
            <span className="hidden sm:inline">Smart Task Manager</span>
          </div>
        </Link>
        <div className="flex gap-6">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
          <div className="flex items-center gap-1">
            <NavLink to="/tasks" className={linkClass}>
              Tasks
            </NavLink>
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs">
                {pendingCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
