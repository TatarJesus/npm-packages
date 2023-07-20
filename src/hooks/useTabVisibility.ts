import { useState, useEffect, useRef } from "react";

interface Reftype {
  id: number;
  callback: (visibility: boolean) => void;
}

export const useTabVisibility = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(!document.hidden);
  const list = useRef<Reftype[]>([]);

  const onVisibilityChange = (
    callback: (visible: boolean) => void
  ): (() => void) => {
    const id = list.current[list.current.length - 1]?.id ?? 0;
    list.current.push({ id: id + 1, callback });
    return () => {
      list.current = list.current.filter((item) => item.id !== id + 1);
    };
  };

  const check = () => {
    if (document.hidden) setCount((count) => count + 1);
    setVisible(!document.hidden);
    list.current.forEach(({ callback }) => callback(!document.hidden));
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", check);

    return () => document.removeEventListener("visibilitychange", check);
  }, []);

  return { count, visible, onVisibilityChange };
};
