import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

interface CharacterLengthProgressProps {
  length: number;
}

export const CharacterLengthProgress: React.FC<CharacterLengthProgressProps> = ({
  length,
}) => {
  const getProgress = (length: number) => {
    if (length < 280) {
      return (length / 280) * 100;
    } else {
      return 100;
    }
  };

  const progress = getProgress(length);

  const classes = useStyles({ progress });

  return (
    <div className={classes.root}>
      {280 - length > -10 && (
        <>
          <CircularProgress
            variant="determinate"
            value={100}
            size={progress >= 90 ? 36 : 24}
            thickness={5}
            className={classes.bottom}
          />
          <CircularProgress
            variant="determinate"
            value={progress}
            size={progress >= 90 ? 36 : 24}
            thickness={5}
            className={classes.top}
          />
        </>
      )}
      {progress >= 90 && <span className={classes.text}>{280 - length}</span>}
    </div>
  );
};
