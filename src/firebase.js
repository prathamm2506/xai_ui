// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADL65Q3Ro04pv4B3dHx1uw3loyYZ8a5A0",
  authDomain: "practical-5-365303.firebaseapp.com",
  projectId: "practical-5-365303",
  storageBucket: "practical-5-365303.firebasestorage.app",
  messagingSenderId: "418224915878",
  appId: "1:418224915878:web:75efe1186b57fa1b367b67",
  measurementId: "G-R4GDSTBXPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
