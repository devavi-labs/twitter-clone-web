import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary, text } }) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: primary.dark,
    opacity: 0.4,
    transition: "all 100ms ease-in",
  },
  top: {
    position: "absolute",
    left: 0,
    transition: "all 100ms ease-in",
    color: primary.main,
  },
}));
