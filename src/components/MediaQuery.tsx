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
  orientation?: string;
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

const camelCase = (camel: string) => {
  const camelCase = camel
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/\s/g, "-");
  return camelCase;
};

const transformationsInfo = (props: OptionsMediaQuery) => {
  return Object.entries(props)
    .map(([key, value]) => {
      switch (key) {
        case "orientation":
          return "(orientation: " + String(value) + "px)";
        case "minWidth":
        case "maxWidth":
        case "minHeight":
        case "maxHeight":
          return "(" + camelCase(key) + ": " + String(value) + "px)";
        case "minResolution":
        case "maxResolution":
          return typeof value === "number"
            ? "(" + camelCase(key) + ": " + String(value) + "ddpx)"
            : "(" + camelCase(key) + ": " + String(value) + ")";
        default:
          return "";
      }
    })
    .join(" and ");
};

const MediaQuery = ({ children, ...props }: ChildrenMediaQuery) => {
  const result = useMediaQuery({ query: transformationsInfo(props) });
  return typeof children === "function" ? (
    <>{children(result)}</>
  ) : result ? (
    <>{children}</>
  ) : null;
};

export default MediaQuery;

export const useMediaQuery = (dimension: { query: string }) => {
  const [result, setResult] = useState(
    window.matchMedia(dimension.query).matches
  );

  useEffect(() => {
    setResult(window.matchMedia(dimension.query).matches);
  }, [dimension.query]);

  return result;
};
