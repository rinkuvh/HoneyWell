import { useEffect } from "react";

const AutoLogout = ({ logout, timeout = 30000 }) => {
  // Default timeout: 10 mins (600,000 ms)

  let timer;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // logout(); // Call your logout function
    }, timeout);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];

    const eventHandler = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, eventHandler));

    resetTimer(); // Start timer initially

    return () => {
      clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, eventHandler)
      );
    };
  }, []);

  return null;
};

export default AutoLogout;
