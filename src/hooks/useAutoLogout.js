import { useEffect, useRef } from "react";
import useSystemInfo from "./useSystemInfo";

const useAutoLogout = ({ type }) => {
  // Default timeout: 10 mins (600,000 ms)
  const timerId = useRef(null);
  const mountId = useRef(null);

  const systemInfo = useSystemInfo(type);

  const resetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      // handleLogout(); // Call your logout function
      timerId.current = null;
    }, 30 * 60 * 1000);
  };

  const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

  useEffect(() => {
    if (mountId.current) {
      clearTimeout(mountId.current);
    }

    const eventHandler = () => resetTimer();

    mountId.current = setTimeout(() => {
      events.forEach((event) => window.addEventListener(event, eventHandler));

      resetTimer(); // Start timer initially
    }, 500);

    return () => {
      clearTimeout(timerId.current);
      clearTimeout(mountId.current);
      events.forEach((event) =>
        window.removeEventListener(event, eventHandler)
      );
    };
  }, [systemInfo]);

  return null;
};

export default useAutoLogout;
