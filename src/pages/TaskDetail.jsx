import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import Badge from "../components/ui/Badge";
import { STATUS } from "../constants";
export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTaskStatus } = useTasks();
  const task = tasks.find((t) => t.id === Number(id));

  const getNextStatus = (status) => {
    if (status === STATUS.PENDING) return STATUS.IN_PROGRESS
    if (status === STATUS.IN_PROGRESS) return STATUS.COMPLETED;
    return null;
  };

  const getButtonLabel = (status) => {
    if (status === STATUS.PENDING) return "Mark as In Progress";
    if (status === STATUS.IN_PROGRESS) return "Mark as Complete";
    return "Completed ✓";
  };

  if (!task)
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        <p className="text-gray-500">Task not found</p>
        <button
          onClick={() => navigate("/tasks")}
          className="mt-4 text-blue-600 cursor-pointer hover:underline">
          ← Go Back
        </button>
      </div>
    );

  const nextStatus = getNextStatus(task.status);

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline cursor-pointer mb-6 block">
        ← Back to Tasks
      </button>

      {/* Task card */}
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
        <p className="text-gray-500 mt-2">{task.description}</p>

        {/* Meta info */}
        <div className="flex gap-4 mt-6 flex-wrap">
          <div>
            <p className="text-xs text-gray-400 mb-1">Status</p>
            <Badge type={task.status} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Priority</p>
            <Badge type={task.priority} />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Due Date</p>
            <p className="text-sm font-medium text-gray-700">{task.dueDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Created At</p>
            <p className="text-sm font-medium text-gray-700">{task.createdAt}</p>
          </div>
        </div>

        {/* Status update button */}
        <div className="mt-8 pt-6  border-t border-gray-100 flex gap-3">
          <button
            onClick={() => nextStatus && updateTaskStatus(task.id, nextStatus)}
            disabled={!nextStatus}
            className={`px-6 py-2 rounded-lg font-medium transition cursor-pointer
              ${
                nextStatus
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-green-100 text-green-700 cursor-not-allowed"
              }`}>
            {getButtonLabel(task.status)}
          </button>
          <button
            onClick={() => navigate(`/tasks/${task.id}/edit` , { replace: true })}
            className="px-6 py-2 rounded-lg cursor-pointer font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition">
            ✏️ Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}
