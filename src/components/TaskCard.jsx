export const TaskCard = ({ task, handleopenTaskViewModal }) => {
  const { title, description, createdAt, status } = task;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const statusMap = {
    todo: {
      text: "Todo",
      bg: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    "in-progress": {
      text: "In Progress",
      bg: "bg-blue-100",
      textColor: "text-blue-800",
    },
    done: {
      text: "Done",
      bg: "bg-green-100",
      textColor: "text-green-800",
    },
  };

  const tag = statusMap[status] || {
    text: "Unknown",
    bg: "bg-gray-200",
    textColor: "text-gray-700",
  };

  return (
    <div
      onClick={() => {
        handleopenTaskViewModal(task);
      }}
      className="bg-white rounded-2xl p-5 shadow-md border-l-4 border-orange-400 h-52 flex flex-col justify-between hover:scale-[1.015] hover:shadow-lg transition-all duration-200"
    >
      <div className="space-y-2">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${tag.bg} ${tag.textColor}`}
        >
          {tag.text}
        </span>
        <h3 className="font-bold text-[#7B341E] text-lg line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-[#5E4733] line-clamp-3">{description}</p>
      </div>
      <p className="text-xs text-right text-gray-500 mt-2">
        Create At: {formattedDate}
      </p>
    </div>
  );
};
