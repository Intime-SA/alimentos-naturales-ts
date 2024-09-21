// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ { tabManager: persistentMultipleTabManager() }
  ),
});
const perf = getPerformance(app);

export const onSingIn = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => {
  // Cerrar sesión
  signOut(auth)
    .then(() => {
      // Borrar información del usuario del localStorage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isLogged");
      console.log(
        "Cerró Sesión y se eliminó la información del usuario del localStorage."
      );
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error.message);
    });
};

let googleProvider = new GoogleAuthProvider();

export const loginGoogle = async () => {
  console.log(auth);
  try {
    console.log(auth);
    const res = await signInWithPopup(auth, googleProvider);

    return res;
  } catch (error) {}
};

let error;

export const signUp = async ({ email, password }) => {
  try {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    return res;
  } catch (error) {
    let ress = await createUserWithEmailAndPassword(auth, email, password);
    console.log(ress);
    if (error.code === "auth/email-already-in-use") {
      console.log("Email ya esta en uso");
      return error;
    }
  }
};

export const forgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};
