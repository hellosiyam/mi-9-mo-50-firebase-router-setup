// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLbXyfgbB0IETWg_Ik78y4zM4jfmvtGc0",
  authDomain: "email-password-register-eedb9.firebaseapp.com",
  projectId: "email-password-register-eedb9",
  storageBucket: "email-password-register-eedb9.firebasestorage.app",
  messagingSenderId: "221507850419",
  appId: "1:221507850419:web:aa6f43ac3daf2e8e1260c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
