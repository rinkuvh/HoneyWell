import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDnFwUTpi3Lbh-pzbP2z6SyK_GT1wkNvXQ",
  authDomain: "lenovotm2025.firebaseapp.com",
  projectId: "lenovotm2025",
  storageBucket: "lenovotm2025.firebasestorage.app",
  messagingSenderId: "462451958810",
  appId: "1:462451958810:web:05c9e8924ac179be785da3",
  measurementId: "G-E207KF6WR0",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
