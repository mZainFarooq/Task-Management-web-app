import { useEffect } from "react";
import AppRoutes from "./router/AppRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./features/authSlice";
import { setTask } from "./features/taskSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          dispatch(
            setUser({
              ...userData,
              createdAt: userData.createdAt?.toDate().toLocaleString(),
            })
          );

          const subCollectionRef = collection(db, "users", user.uid, "tasks");
          const querySnapshot = await getDocs(subCollectionRef);
          querySnapshot?.forEach((doc) => {
            dispatch(
              setTask({
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toLocaleDateString(),
              })
            );
          });
        } else {
          dispatch(setUser(doc.exists() ? doc.data() : false));
        }
      } else {
        dispatch(setUser(false));
        dispatch(setTask([]));
      }
    });
    return () => unSubscribe();
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
