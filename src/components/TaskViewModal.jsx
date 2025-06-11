const TaskViewModal = ({ task, onClose, onEdit, onDelete }) => {
  if (!task) return null;

  const statusStyles = {
    todo: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100  text-blue-800",
    done: "bg-green-100  text-green-800",
  };

  const badge = statusStyles[task.status] || "bg-gray-200 text-gray-700";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#FFF7F0] p-6 shadow-lg">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7B341E] hover:text-red-500 transition-colors"
        >
          X
        </button>

        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#7B341E]">{task.title}</h2>
            <span
              className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${badge}`}
            >
              {task.status?.replace("-", " ")}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 text-sm text-[#5E4733]">
          <div>
            <p className="font-medium text-[#7B341E]">Description</p>
            <div className="mt-1 rounded-md border border-[#FCD9B8] bg-[#FFF3E6] px-4 py-2">
              {task.description || "—"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-[#7B341E]">Due Date</p>
              <div className="mt-1 rounded-md border border-[#FCD9B8] bg-[#FFF3E6] px-3 py-1.5">
                {task.dueDate}
              </div>
            </div>
            <div>
              <p className="font-medium text-[#7B341E]">Created At</p>
              <div className="mt-1 rounded-md border border-[#FCD9B8] bg-[#FFF3E6] px-3 py-1.5">
                {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div>
            <p className="font-medium text-[#7B341E]">Task ID</p>
            <div className="mt-1 break-all rounded-md border border-[#FCD9B8] bg-[#FFF3E6] px-4 py-1.5">
              {task.taskId}
            </div>
          </div>

          <div>
            <p className="font-medium text-[#7B341E]">User ID</p>
            <div className="mt-1 break-all rounded-md border border-[#FCD9B8] bg-[#FFF3E6] px-4 py-1.5">
              {task.uid}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onEdit}
            className="rounded-md bg-[#FFE8D6] px-4 py-2 text-sm text-[#7B341E] transition hover:bg-[#FCD9B8]"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700 transition hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;
