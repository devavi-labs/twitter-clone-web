import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
  body: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
  },
  profile: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: "0.4em",
    height: "3.5rem",
    width: "3.5rem",
  },
  check: {
    color: primary.main,
    fontSize: "1.5rem",
    opacity: type === "dark" ? 0.8 : 1,
  },
  logoutText: {
    textTransform: "initial",
    opacity: type === "dark" ? 0.7 : 1,
    color: text.primary,
  },
}));
