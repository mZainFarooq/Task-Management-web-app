import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./config";
import toast from "react-hot-toast";
import { setUser } from "../features/authSlice";
import { fetchUserTasks } from "./taskHandling";

const addUserToFirestore = async (user, data) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Firestore error:", error.message);
    throw new Error("Profile save nahi ho saka. Dobara try karo.");
  }
};

export const handleSignUpwithEmailandPassword = async (
  setLoading,
  data,
  dispatch
) => {
  try {
    setLoading(true);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    await addUserToFirestore(user, data);
    dispatch(setUser({ ...data, uid: user.uid }));
    toast.success("Account Successfully Created");
  } catch (error) {
    console.error("❌ Signup error:", error.message);

    let message = "Something went wrong! please try agin later!.";
    switch (error.code) {
      case "auth/email-already-in-use":
        message = "Email is already in use.";
        break;
      case "auth/invalid-email":
        message = "Email address is not valid.";
        break;
      case "auth/weak-password":
        message = "Password at least 6 charcters long.";
        break;
    }
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

const handleReadDataFromFirestore = async (user) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export const handleSignInwithEmailandPassword = async (
  setLoading,
  data,
  dispatch
) => {
  try {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const userData = await handleReadDataFromFirestore(userCredential.user);
    dispatch(
      setUser({
        ...userData,
        createdAt: userData.createdAt?.toDate().toLocaleString(),
      })
    );

    await fetchUserTasks(userData.uid, dispatch);

    toast.success("Login Successful");
  } catch (error) {
    console.error("❌ Login error:", error.message);

    let message = "Login failed. Please try again.";
    switch (error.code) {
      case "auth/user-not-found":
        message = "User didnot exist sign up first";
        break;
      case "auth/wrong-password":
        message = "Wrong Password ";
        break;
      case "auth/invalid-email":
        message = "Invalid Email format .";
        break;
    }
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

export const handleLogout = async (dispatch, navigate) => {
  try {
    await signOut(auth);
    dispatch(setUser(false));
    navigate("/signin");
    toast.success("Logout successfully ✅");
  } catch (error) {
    console.error("Logout error:", error.message);
    toast.error("Something went wrong.");
  }
};

export const handleupdateUserData = async (user, data, setisEdit, dispatch) => {
  try {
    const updatedDocRef = doc(db, "users", user.uid);
    await updateDoc(updatedDocRef, {
      ...data,
    });
    toast.success("Changes Saved!🎉");
    dispatch(
      setUser({
        ...user,
        ...data,
      })
    );
  } catch (error) {
    toast.error(error.code || "Update failed");
    toast.error(error.message);
  } finally {
    setisEdit(false);
  }
};
