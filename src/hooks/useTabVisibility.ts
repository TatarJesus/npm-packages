import { useState, useEffect, useRef } from "react";

interface Callback {
  id: number;
  callback: (visibility: boolean) => void;
}

export const useTabVisibility = () => {
  const getDocHidden = (): boolean => {
    if (typeof document !== "undefined") {
      return !document.hidden;
    }
    return true;
  };

  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(getDocHidden());
  const callbackList = useRef<Callback[]>([]);

  const onVisibilityChange = (
    callback: (visible: boolean) => void
  ): (() => void) => {
    const id = callbackList.current[callbackList.current.length - 1]?.id ?? 0;
    callbackList.current.push({ id: id + 1, callback });
    return () => {
      callbackList.current = callbackList.current.filter(
        (item) => item.id !== id + 1
      );
    };
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () =>
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
  }, []);

  const visibilityChangeHandler = () => {
    if (document.hidden) setCount((currentCount) => currentCount + 1);
    setVisible(!document.hidden);
    callbackList.current.forEach(({ callback }) => callback(!document.hidden));
  };

  return { count, visible, onVisibilityChange };
};
