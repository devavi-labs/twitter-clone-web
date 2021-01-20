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
}));
