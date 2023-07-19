import { useState, useEffect, useCallback } from "react";

const getIsVisible = (): boolean => {
  if (typeof document === "undefined") {
    return true;
  }
  return !document.hidden;
};

export const useTabVisibility = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(getIsVisible());

  const handleVisibility = useCallback(() => {
    setVisible(getIsVisible());
    check();
  }, [setVisible]);

  const check = () => {
    if (window?.document.hidden === true) {
      setCount((count: number) => count + 1);
    }
    setVisible(!document.hidden);
  };

  useEffect(() => {
    window?.document.addEventListener(
      "visibilitychange",
      handleVisibility,
      false
    );

    return () =>
      window?.document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
  }, [handleVisibility]);

  return { count, visible, handleVisibility };
};

