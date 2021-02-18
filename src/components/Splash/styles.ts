import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary } }) => ({
  paper: {
    backgroundColor: primary.main,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
  logoContainer: {
    position: "relative",
    display: "grid",
    placeItems: "center",
  },
  progress: {
    position: "absolute",
    color: "white",
  },
  serverDelayMessageContainer: {
    maxWidth: 400,
    margin: "0.4rem 0",
  },
  serverDelayMessage: {
    fontSize: "1.2rem",
    textAlign: "center",
  },
}));
