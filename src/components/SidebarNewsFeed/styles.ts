import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary, type, text } }) => ({
  feedCard: {
    width: "100%",
    backgroundColor: type === "dark" ? "#15181C" : "#F7F9FA",
    borderRadius: "1rem",
    padding: 0,
  },
  loading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem 0",
  },
  feedHeader: {
    padding: "1rem",
  },
  heading: {
    margin: 0,
    fontSize: "1.2rem",
    color: text.primary,
  },
  footer: {
    textTransform: "unset",
    padding: "1rem",
    color: primary.main,
    borderBottomLeftRadius: "1rem",
    borderBottomRightRadius: "1rem",
  },
}));
