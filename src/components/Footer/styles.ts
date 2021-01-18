import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { type, secondary } }) => ({
  footer: {
    backgroundColor: secondary.main,
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  copyrightText: {
    fontSize: "0.8rem",
    textAlign: "center",
    opacity: type === "dark" ? 0.6 : 1,
  },
}));
