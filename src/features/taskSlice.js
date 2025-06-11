import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      }
      state.unshift(action.payload);
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.findIndex((task) => task.taskId === id);

      if (taskIndex !== -1) {
        state[taskIndex] = {
          ...state[taskIndex],
          ...updatedTask,
        };
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.taskId !== action.payload);
    },
  },
});

export const { setTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
