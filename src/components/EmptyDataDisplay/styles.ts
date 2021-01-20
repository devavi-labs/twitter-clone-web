import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
    margin: "1rem 0",
    padding: "1rem",
    textAlign: "center",
  },
  icon: {
    fontSize: "2.5rem",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: text.primary,
    marginBottom: "0.6rem",
  },
  message: {
    fontSize: "0.9rem",
    color: text.secondary,
  },
}));
