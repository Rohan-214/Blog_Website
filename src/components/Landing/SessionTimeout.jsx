import React, { useEffect, useRef } from "react";

const SessionTimeout = ({ timeout = 5 * 60 * 1000, onTimeout }) => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onTimeout(); // what to do when session expires
    }, timeout);
  };

  useEffect(() => {
    // reset on user activity
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null; // no UI
};

export default SessionTimeout;
