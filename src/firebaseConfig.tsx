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

// Firebase configuration
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
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
const perf = getPerformance(app);

// Types for user credentials
interface UserCredentials {
  email: string;
  password: string;
}

// Sign in with email and password
export const onSignIn = async ({ email, password }: UserCredentials) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error; // Re-throw to handle in the calling function
  }
};

// Log out the user
export const logOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLogged");
    console.log(
      "Successfully logged out and user info cleared from localStorage."
    );
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
};

// Google login provider
const googleProvider = new GoogleAuthProvider();

// Login with Google
export const loginGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
};

// Sign up a new user
export const signUp = async ({ email, password }: UserCredentials) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created:", res);
    return res;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("Email is already in use");
    } else {
      console.error("Error during sign up:", error);
    }
    throw error; // Re-throw to handle in the calling function
  }
};

// Send password reset email
export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent to:", email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
