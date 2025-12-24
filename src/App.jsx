import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Routes from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/Global.css";
import "./assets/styles/Global.responsive.css";
import "./assets/styles/user.css";
import "./assets/styles/user.responsive.css";
import { messaging } from "./config/Firebase";
import { onMessage } from "firebase/messaging";
import PageIndex from "./containers/PageIndex";
import { setNotificationCountAction } from "./redux/slices/UserSlice";
import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
{
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.warn = () => {};
}

function App() {
  const dispatch = PageIndex.useDispatch();
  const { notificationCount } = PageIndex.useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const { title, body } = payload.notification || {};
      console.log("New notification: ", payload);
      dispatch(setNotificationCountAction(notificationCount + 1));
      if (Notification.permission === "granted") {
        new Notification(title || "Notification", {
          body,
          icon: PageIndex.Png.Logo,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title || "Notification", {
              body,
              icon: PageIndex.Png.Logo,
            });
          }
        });
      } else {
        toast.info(`${title}: ${body}`);
      }
    });

    return () => unsubscribe();
  }, [dispatch, notificationCount]);

  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
