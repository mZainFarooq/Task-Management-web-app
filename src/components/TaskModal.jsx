// AddTaskModal.jsx
import { serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddTaskModal({ onClose, onSubmit, isEdit, task }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      dueDate: "",
    },
  });
  useEffect(() => {
    if (isEdit && task) {
      reset({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().slice(0, 10)
          : "",
      });
    } else {
      reset();
    }
  }, [isEdit, task, reset]);

  const handleFormSubmit = (data) => {
    if (isEdit) {
      const updatedTask = {
        ...data,
        taskId: task?.taskId,
        uid: task?.uid,
        createdAt: serverTimestamp(),
      };
      onSubmit(updatedTask);
    } else {
      onSubmit(data);
    }

    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#7B341E]/40 z-[9999] flex items-center justify-center">
      <div className="bg-[#FFF7F0] w-full max-w-md p-6 rounded-2xl shadow-lg border border-[#FFE8D6]">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#7B341E]">Add New Task</h2>
            <p className="text-sm text-[#A16246]">Fill the fields below</p>
          </div>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="text-[#7B341E] hover:text-[#F97316] text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-[#7B341E]">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Task title"
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                errors.title ? "border-red-500" : "border border-[#FCD9B8]"
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-[#7B341E]">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="3"
              placeholder="Write something..."
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                errors.description
                  ? "border-red-500"
                  : "border border-[#FCD9B8]"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-[#7B341E]">Status</label>
            <select
              {...register("status", { required: "Status is required" })}
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                errors.status ? "border-red-500" : "border border-[#FCD9B8]"
              }`}
            >
              <option value="">Select status</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-600 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium text-[#7B341E]">
              Due Date
            </label>
            <input
              type="date"
              {...register("dueDate", { required: "Due date is required" })}
              className={`mt-1 w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                errors.dueDate ? "border-red-500" : "border border-[#FCD9B8]"
              }`}
            />
            {errors.dueDate && (
              <p className="text-sm text-red-600 mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-[#FFE8D6] text-[#7B341E] hover:bg-[#FCD9B8]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#FB923C] text-white hover:bg-[#F97316]"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
