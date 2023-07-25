import { useState, useEffect } from "react";

interface QueryMedia {
  query: string;
}

export const useMediaQuery = ({ query }: QueryMedia) => {
  const getMatches = (query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  const getInitialState = () => {
    setMatches(getMatches(query));
  };

  useEffect(() => {
    const queryMedia = window.matchMedia(query);

    getInitialState();
    queryMedia.addEventListener("change", getInitialState);

    return () => queryMedia.removeEventListener("change", getInitialState);
  }, [query]);

  return matches;
};
