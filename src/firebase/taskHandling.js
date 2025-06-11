import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import toast from "react-hot-toast";
import { deleteTask, editTask, setTask } from "../features/taskSlice";

export const handleAddTaskToFirestore = async (user, data, dispatch) => {
  const { uid } = user;
  try {
    console.log(uid, data);
    if (!uid || !data) {
      toast.error("User ID ya data missing hai 😕");
      return;
    }

    const taskRef = collection(db, "users", uid, "tasks");
    const docRef = await addDoc(taskRef, {
      ...data,
      uid: uid,
      createdAt: serverTimestamp(),
    });

    const docId = docRef.id;
    const docRefToUpdate = doc(db, "users", uid, "tasks", docId);
    await updateDoc(docRefToUpdate, {
      taskId: docId,
    });

    dispatch(
      setTask({
        ...data,
        uid: uid,
        createdAt: new Date().toString(),
        taskId: docId,
      })
    );

    toast.success("Task Add Sucessfully");
  } catch (error) {
    toast.error(error.code);
    toast.error(error.message);
  }
};

export const handleEditTaskToFirestore = async (
  user,
  taskId,
  data,
  dispatch
) => {
  try {
    const updatedTaskRef = doc(db, "users", user.uid, "tasks", taskId);

    await updateDoc(updatedTaskRef, {
      ...data,
      createdAt: serverTimestamp(),
    });

    dispatch(
      editTask({
        id: taskId,
        updatedTask: {
          ...data,
          createdAt: new Date().toLocaleDateString(),
        },
      })
    );
    toast.success("Task Updated Sucessfully!");
  } catch (error) {
    toast.error(error.code);
    toast.error(error.message);
  }
};

export const fetchUserTasks = async (uid, dispatch) => {
  const querySnapshot = await getDocs(collection(db, "users", uid, "tasks"));
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toLocaleDateString(),
    });
  });
  dispatch(setTask([...tasks]));
};

export const handleDeleteTask = async (userId, taskId, dispatch) => {
  try {
    const taskRef = doc(db, "users", userId, "tasks", taskId);
    await deleteDoc(taskRef);

    dispatch(deleteTask(taskId));
    toast.success("Task deleted successfully ✅");
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    toast.error("Failed to delete task. Please try again ❌");
  }
};
