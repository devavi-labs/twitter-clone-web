import { LinearProgress } from "@material-ui/core";
import React from "react";

interface TopProgressBarProps {
  visible?: boolean;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({
  visible = true,
}) => {
  return (
    <LinearProgress
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}
      hidden={!visible}
    />
  );
};
