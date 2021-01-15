import { createBrowserHistory, LocationState, Path } from "history";
import { PathLocationManager } from "../utils/pathLocationManager";

export const useBetterGoBack = () => {
  const history = createBrowserHistory();
  const manager = new PathLocationManager();

  const goBackOrReplace = (location: Path, state?: LocationState): void => {
    if (manager?.isPreviousLocationWithinApp) {
      history.goBack();
    } else {
      history.replace(location, state);
    }
  };

  return goBackOrReplace;
};
