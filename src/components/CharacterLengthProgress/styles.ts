import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles<Theme, { progress: number }>(
  ({ palette: { primary, text, warning, error } }) => ({
    root: {
      position: "relative",
      width: ({ progress }) => (progress >= 90 ? 36 : 24),
      height: ({ progress }) => (progress >= 90 ? 36 : 24),
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
      color: ({ progress }) =>
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
      color: ({ progress }) => (progress === 100 ? error.main : warning.main),
    },
  })
);
