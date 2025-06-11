import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../components/TaskCard";
import TaskViewModal from "../components/TaskViewModal";
import AddTaskModal from "../components/TaskModal";
import {
  handleAddTaskToFirestore,
  handleDeleteTask,
  handleEditTaskToFirestore,
} from "../firebase/taskHandling";

export default function TaskPage() {
  const [filter, setFilter] = useState("all");
  const tasks = useSelector((state) => state.task);
  const user = useSelector((state) => state.user);

  const [isOpen, setisOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const filters = [
    { key: "all", label: "All" },
    { key: "todo", label: "Todo" },
    { key: "in-progress", label: "In Progress" },
    { key: "done", label: "Done" },
  ];

  const handleopenTaskViewModal = (task) => {
    setSelectedTask(task);
    setisOpen(true);
  };

  const handleAddTask = (taskData) => {
    if (isEdit) {
      handleEditTaskToFirestore(user, selectedTask.taskId, taskData, dispatch);
      setIsEdit(false);
    } else {
      handleAddTaskToFirestore(user.uid, taskData, dispatch);
    }
  };
  return (
    <div className="min-h-screen bg-[#FFF7F0] px-6 py-10 flex flex-col items-center">
      {/* Heading and Add Button */}
      <div className="w-full xl:max-w-[90%] flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#7B341E]">My Tasks</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#FB923C] hover:bg-[#f97316] text-white font-medium px-5 py-2 rounded-full shadow-md transition"
        >
          + Add Task
        </button>
      </div>

      {showAddModal && (
        <AddTaskModal
          onClose={() => {
            setShowAddModal(false);
            isEdit && setIsEdit(false);
          }}
          onSubmit={handleAddTask}
          isEdit={isEdit}
          task={selectedTask}
        />
      )}

      {/* Task Modal */}
      {isOpen && (
        <TaskViewModal
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            setisOpen(false);
            setIsEdit(false);
          }}
          onEdit={() => {
            setShowAddModal(true);
            setisOpen(false);
            setIsEdit(true);
          }}
          onDelete={() => {
            setisOpen(false);
            handleDeleteTask(user.uid, selectedTask.taskId, dispatch);
          }}
        />
      )}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full transition ${
              filter === key
                ? "bg-[#FB923C] text-white shadow-sm"
                : "bg-[#FFE8D6] text-[#7B341E] hover:bg-[#FCD9B8]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      {filteredTasks.length === 0 ? (
        <p className="text-[#7B341E] font-medium italic">
          No tasks for this filter!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full xl:max-w-[90%]">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.taskId}
              task={task}
              handleopenTaskViewModal={handleopenTaskViewModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
