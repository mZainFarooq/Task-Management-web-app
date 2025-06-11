import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAabgV-zS3ouIy8bVs1AxvPYjEYL8M6VRM",
  authDomain: "to-do-web-app-dc705.firebaseapp.com",
  projectId: "to-do-web-app-dc705",
  storageBucket: "to-do-web-app-dc705.firebasestorage.app",
  messagingSenderId: "461320232855",
  appId: "1:461320232855:web:afb1415ba76afa84622ed2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
