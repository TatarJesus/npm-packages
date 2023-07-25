import { useState, useEffect, ReactNode } from "react";

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type Resolution = `${number}dppx`;

interface OptionsMediaQuery {
  orientation?: "portrait" | "landscape";
  minResolution?: number | Resolution;
  maxResolution?: number | Resolution;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

type ChildrenMediaQuery = {
  children: ReactNode | ((result: boolean) => ReactNode);
} & RequireAtLeastOne<OptionsMediaQuery>;

interface QueryMedia {
  query: string;
}

const camelCaseToRegular = (key: string) => {
  const camelCase = key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/\s/g, "-");
  return camelCase;
};

const transformationsInfo = (props: OptionsMediaQuery) => {
  return Object.entries(props)
    .map(([key, value]) => {
      const valueFromKey = String(value);
      switch (key) {
        case "orientation":
          return `(orientation: ${valueFromKey})`;
        case "minWidth":
        case "maxWidth":
        case "minHeight":
        case "maxHeight":
          return `(${camelCaseToRegular(key)}: ${valueFromKey}px)`;
        case "minResolution":
        case "maxResolution":
          return `(${camelCaseToRegular(key)}: ${
            typeof value === "number" ? valueFromKey + "dppx" : valueFromKey
          })`;
      }
    })
    .join(" and ");
};

const MediaQuery = ({ children, ...props }: ChildrenMediaQuery) => {
  const matches = useMediaQuery({ query: transformationsInfo(props) });
  return typeof children === "function" ? (
    <>{children(matches)}</>
  ) : matches ? (
    <>{children}</>
  ) : null;
};

export default MediaQuery;

export const useMediaQuery = ({ query }: QueryMedia) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const changeHandler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    const queryMedia = window.matchMedia(query);

    setMatches(queryMedia.matches);

    queryMedia.addEventListener("change", changeHandler);

    return () => queryMedia.removeEventListener("change", changeHandler);
  }, [query]);

  return matches;
};
