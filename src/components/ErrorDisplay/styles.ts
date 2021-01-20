import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    margin: "1rem 0",
    color: text.secondary,
    padding: "1rem",
    textAlign: "center",
  },
  icon: {
    fontSize: "2.5rem",
  },
  text: {
    fontSize: "0.9rem",
  },
}));
