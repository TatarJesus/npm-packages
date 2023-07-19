import React, { useState, useEffect } from "react";

interface optionsMediaQuery {
  orientation?: string;
  minResolution?: number | string;
  maxResolution?: number | string;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  renderContent?: (result: boolean) => React.ReactNode;
  children?: React.ReactNode;
}

const transformationsInfo = (props: optionsMediaQuery) => {
  let matchMediaString = "";
  switch (Object.keys(props)[0]) {
    case "orientation":
      matchMediaString += "(orientation: " + String(props.orientation) + "px)";
      break;
    case "minResolution":
      matchMediaString +=
        "(min-resolution: " +
        (typeof props.minResolution === "number"
          ? String(props.minResolution) + "dppx"
          : String(props.minResolution)) +
        ")";
      console.log(typeof props.renderContent);
      return [window.matchMedia(matchMediaString).matches, true];
    case "maxResolution":
      matchMediaString +=
        "(max-resolution: " +
        (typeof props.maxResolution === "number"
          ? String(props.maxResolution) + "dppx"
          : String(props.maxResolution)) +
        ")";
      return [window.matchMedia(matchMediaString).matches, true];
    case "minWidth":
      matchMediaString += "(min-width: " + String(props.minWidth) + "px)";
      break;
    case "maxWidth":
      matchMediaString += "(max-width: " + String(props.maxWidth) + "px)";
      break;
    case "minHeight":
      matchMediaString += "(min-height: " + String(props.minHeight) + "px)";
      break;
    case "maxHeight":
      matchMediaString += "(max-height: " + String(props.maxHeight) + "px)";
      break;
    default:
      break;
  }
  return [window.matchMedia(matchMediaString).matches, false];
};

const MediaQuery = (props: optionsMediaQuery) => {
  const [result, setResult] = useState(false);
  const [resolData, setResolData] = useState(false);

  useEffect(() => {
    const res = transformationsInfo(props);
    setResult(res[0]);
    setResolData(res[1]);
  }, []);

  if (resolData && props.renderContent !== undefined)
    return props.renderContent(result);
  else return result ? props.children : null;
};

export default MediaQuery;

export const useMediaQuery = (dimension: { query: string }) => {
  const [result, setResult] = useState(false);

  useEffect(() => {
    setResult(window.matchMedia(dimension.query).matches);
  }, []);

  return result;
};
