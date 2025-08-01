import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import taskReducer from "./features/taskSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    task: taskReducer,
  },
});
