import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/ui/TaskForm"
import { PRIORITY } from "../constants";
export default function AddTask() {
  const navigate = useNavigate()
  const { addTask, showToast } = useTasks()

  const handleSubmit = (formData) => {
    addTask(formData)
    showToast("✅ Task added successfully")
    navigate("/tasks")
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800">Add New Task</h1>
      <p className="text-gray-500 mt-1">Fill in the details below</p>
      <TaskForm
        initialValues={{ title: "", description: "", priority: PRIORITY.MEDIUM, dueDate: "" }}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        submitLabel="Add Task"
      />
    </div>
  )
}