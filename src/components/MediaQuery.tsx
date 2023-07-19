import { useState, useEffect } from "react";

const MediaQuery = (props: any) => {
  const [result, setResult] = useState<boolean>(false);
  const [resolData, setResolData] = useState<boolean>(false);

  useEffect(() => {
    let matchMediaString = "";
    switch (Object.keys(props)[0]) {
      case "orientation":
        matchMediaString += "(orientation: " + props.orientation + "px)";
        break;
      case "minResolution":
        matchMediaString +=
          "(min-resolution: " +
          
          (typeof props.minResolution === "number"
            ? props.minResolution + "dppx"
            : props.minResolution) +
          ")";
        setResolData(true);
        break;
      case "maxResolution":
        matchMediaString +=
          "(max-resolution: " +
          (typeof props.maxResolution === "number"
            ? props.maxResolution + "dppx"
            : props.maxResolution) +
          ")";
        setResolData(true);
        break;
      case "minWidth":
        matchMediaString += "(min-width: " + props.minWidth + "px)";
        break;
      case "maxWidth":
        matchMediaString += "(max-width: " + props.maxWidth + "px)";
        break;
      case "minHeight":
        matchMediaString += "(min-height: " + props.minHeight + "px)";
        break;
      case "maxHeight":
        matchMediaString += "(max-height: " + props.maxHeight + "px)";
        break;
      default:
        break;
    }
    setResult(window.matchMedia(matchMediaString).matches);
  }, []);

  if (resolData) return props.renderContent(result);
  else return result ? props.children : null;
};

export default MediaQuery;

export const useMediaQuery = (dimension: { query: string }) => {
  const [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    setResult(window.matchMedia(dimension.query).matches);
  }, []);
  return result;
}