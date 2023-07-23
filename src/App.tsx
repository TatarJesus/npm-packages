import { useEffect } from "react";
import MediaQuery from "react-ts-media-query";
import { useMediaQuery } from "react-ts-media-query";
import { useTabVisibility } from "react-ts-tab-visibility";

export const App = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const { count, visible, onVisibilityChange } = useTabVisibility();

  useEffect(() => {
    const one = onVisibilityChange((isVisible: boolean) => {
      console.log("first handler", isVisible);
    });

    setTimeout(() => {
      one();
    }, 1000);

    const unsubscribeSecondHandler = onVisibilityChange(
      (isVisible: boolean) => {
        console.log("second handler", isVisible);
      }
    );

    setTimeout(() => {
      unsubscribeSecondHandler();
    }, 5000);

    const unsubscribeThreeHandler = onVisibilityChange((isVisible: boolean) => {
      console.log("three handler", isVisible);
    });

    setTimeout(() => {
      unsubscribeThreeHandler();
    }, 3000);
  }, []);

  return (
    <div className="container">
      <div className="tab-visibility">
        <span>Вы покинули страницу: {count} раз</span>
        <span>Вкладка активна? {visible ? "Да" : "Нет"}</span>
      </div>
      <div className="media-query">
        <h2>Device Test!</h2>
        {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
        {isBigScreen && <p>You have a huge screen</p>}
        {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
        <p>Your are in {isPortrait ? "portrait" : "landscape"} orientation</p>
        {isRetina && <p>You are retina</p>}
      </div>
      <div className="media-query">
        <h2>Device Test!</h2>
        <MediaQuery minWidth={1224} maxWidth={2000}>
          <p>You are a desktop or laptop</p>
          <MediaQuery minWidth={1824}>
            <p>You also have a huge screen</p>
          </MediaQuery>
        </MediaQuery>
        <MediaQuery minResolution={2}>
          {(result: boolean) =>
            result ? <p>You are retina</p> : <p>You are not retina</p>
          }
        </MediaQuery>
      </div>
    </div>
  );
};
