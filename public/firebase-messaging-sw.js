importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDnFwUTpi3Lbh-pzbP2z6SyK_GT1wkNvXQ",
  authDomain: "lenovotm2025.firebaseapp.com",
  projectId: "lenovotm2025",
  storageBucket: "lenovotm2025.firebasestorage.app",
  messagingSenderId: "462451958810",
  appId: "1:462451958810:web:05c9e8924ac179be785da3",
  measurementId: "G-E207KF6WR0",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAxjn-JzBnP6xkoDOGic7iVii6_nZuBQgA",
//   authDomain: "demoforpushnotification-34e53.firebaseapp.com",
//   projectId: "demoforpushnotification-34e53",
//   storageBucket: "demoforpushnotification-34e53.firebasestorage.app",
//   messagingSenderId: "29039670066",
//   appId: "1:29039670066:web:bc8374d6cdd7b18cc85d2b",
//   measurementId: "G-3KXTZS14CL",
// };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );

  const notificationTitle = payload.notification.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message.",
    icon: payload.notification?.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
