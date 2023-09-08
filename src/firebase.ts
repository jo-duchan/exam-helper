// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByRM3_MEkC6WDNwnuu7Sx3NUc8G6AYHLI",
  authDomain: "exam-helper-dc8a2.firebaseapp.com",
  projectId: "exam-helper-dc8a2",
  storageBucket: "exam-helper-dc8a2.appspot.com",
  messagingSenderId: "1053500333733",
  appId: "1:1053500333733:web:9a7dccd3299207df07f74c",
  measurementId: "G-Y43G2P603P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
