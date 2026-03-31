import { Link } from "react-router-dom";
import Badge from "./Badge";
import EmptyState from "./EmptyState"; // Import your component
import { STATUS } from "../../constants";
import PropTypes from "prop-types";

const TaskList = ({ tasks, onDelete }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (tasks.length === 0) {
    return (
      <EmptyState
        message="No tasks found"
        subMessage="Try adjusting your filters or add a new task to get started!"
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow mt-6 overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-800 p-6 pb-2">
        Recent Tasks
      </h2>
      <ul className="divide-y divide-gray-100">
        {tasks.map((task) => {
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);

          const isOverdue =
            taskDate < today && task.status !== STATUS.COMPLETED;

          return (
            <li key={task.id}>
              <div
                className={`px-6 py-4 flex justify-between items-center transition ${
                  isOverdue
                    ? "bg-red-50 border-l-4 border-red-500"
                    : "hover:bg-gray-50 border-l-4 border-transparent"
                }`}>
                <Link
                  to={`/tasks/${task.id}`}
                  className={`sm:font-medium text-sm flex-1 transition ${
                    isOverdue
                      ? "text-red-900"
                      : "text-gray-800 hover:text-blue-600"
                  }`}>
                  {task.title}
                  {isOverdue && (
                    <span className="ml-2 text-xs font-bold uppercase text-red-600">
                      [Overdue]
                    </span>
                  )}
                </Link>

                <div className="sm:flex gap-2  items-center">
                  <div className="sm:flex gap-2 hidden">
                    <Badge type={task.priority} />
                    <Badge type={task.status} />
                  </div>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="ml-4 p-2 text-gray-800 hover:text-red-600 transition-colors">
                    ✕
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string, // Not required (tasks can have empty description)
      dueDate: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["pending", "in-progress", "completed"])
        .isRequired,
      priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskList;
