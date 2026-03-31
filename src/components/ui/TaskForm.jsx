import { useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";
const TaskForm = ({ initialValues, onSubmit, submitLabel, onCancel }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // 1. Use initialValues instead of hardcoded empty strings
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // 2. Copy handleChange exactly from AddTask.jsx
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  // 3. Copy validate exactly from AddTask.jsx
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    if (new Date(formData.dueDate) < today) {
      newErrors.dueDate = "Past date cannot be used";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. handleSubmit calls onSubmit prop instead of addTask
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData); // 👈 calls whatever parent passes
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-8 mt-6">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 
              ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border cursor-pointer border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="high" className="cursor-pointer">
            High
          </option>
          <option value="medium" className="cursor-pointer">
            Medium
          </option>
          <option value="low" className="cursor-pointer">
            Low
          </option>
        </select>
      </div>

      {/* Due Date */}
      <div className="mb-6">
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 
              ${
                errors.dueDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
TaskForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    dueDate: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
};
export default TaskForm;
