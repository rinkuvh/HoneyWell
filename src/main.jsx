import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, Persistor } from "./redux/Store";

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/firebase-messaging-sw.js")
//       .then((registration) => {})
//       .catch((error) => {});
//   });
// }

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered");
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
};

// Call service worker registration
registerServiceWorker();


createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>
);
