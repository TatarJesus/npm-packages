import { useState, useEffect } from "react";

const getIsVisible = (): boolean => {
  if (typeof document === "undefined") {
    return true;
  }
  return !document.hidden;
};

export const useTabVisibility = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(getIsVisible());

  const onVisibilityChange = (callback: (visible: boolean) => void) => {
    callback(visible);
    setCount((count: number) => count + 1);
  };

  const check = () => {
    const vis = getIsVisible();
    if (!vis) {
      setCount((count: number) => count + 1);
    }
    setVisible(vis);
  };

  useEffect(() => {
    window?.document.addEventListener(
      "visibilitychange",
      check
    );

    return () =>
      window?.document.removeEventListener(
        "visibilitychange",
        check
      );
  }, []);

  return { count, visible, onVisibilityChange };
};

