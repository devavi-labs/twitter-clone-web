import { useEffect, useMemo } from "react";
import { PathLocationManager } from "../utils/pathLocationManager";

export const useLocationManager = () => {
  const { location } = window;
  const manager = useMemo(() => new PathLocationManager(), []);

  useEffect(() => {
    if (manager.lastLocation !== location) {
      manager.register(location);
    }
  }, [location, manager]);
};
