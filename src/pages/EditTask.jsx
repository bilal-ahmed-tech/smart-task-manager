import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/ui/TaskForm";
import Button from "../components/ui/Button";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === Number(id));

  // Handle task not found
  if (!task)
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        <p className="text-gray-500">Task not found</p>
        <Button variant="link" onClick={() => navigate(-1)}>
          ← Go Back
        </Button>
      </div>
    );

  const handleSubmit = (formData) => {
    updateTask(Number(id), formData);
    navigate(`/tasks/${id}`, { replace: true });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
      <p className="text-gray-500 mt-1">Update the task details below</p>
      <TaskForm
        initialValues={{
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate,
        }}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/tasks/${id}`, { replace: true })}
        submitLabel="Save Changes"
      />
    </div>
  );
}
