import { useState, useEffect } from "react";

export const useMediaQuery = (dimension: { query: string }) => {
  const [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    setResult(window.matchMedia(dimension.query).matches);
  }, []);
  return result;
}
