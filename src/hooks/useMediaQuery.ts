import { useState, useEffect } from "react";

interface QueryMedia {
  query: string;
}

export const useMediaQuery = ({ query }: QueryMedia) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const queryMedia = window.matchMedia(query);

    setMatches(queryMedia.matches);

    queryMedia.addEventListener("change", changeHandler);

    return () => queryMedia.removeEventListener("change", changeHandler);
  }, [query]);

  const changeHandler = () => {
    const queryMedia = window.matchMedia(query);
    setMatches(queryMedia.matches);
  };

  return matches;
};
