import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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

  const useStyles = makeStyles(
    ({ palette: { primary, text, warning, error } }) => ({
      root: {
        position: "relative",
        width: progress >= 90 ? 36 : 24,
        height: progress >= 90 ? 36 : 24,
        transition: "all 100ms ease-in",
      },
      bottom: {
        color: text.primary,
        opacity: 0.2,
        transition: "all 100ms ease-in",
      },
      top: {
        position: "absolute",
        left: 0,
        transition: "all 100ms ease-in",
        color:
          progress === 100
            ? error.main
            : progress >= 90
            ? warning.main
            : primary.main,
      },
      text: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
        color: progress === 100 ? error.main : warning.main,
      },
    })
  );

  const classes = useStyles();

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
