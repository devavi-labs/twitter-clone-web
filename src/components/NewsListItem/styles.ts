import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  feedItem: {
    textTransform: "unset",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    margin: "0.5em 0",
    fontSize: "0.9rem",
    lineHeight: "1.2em",
    color: text.primary,
  },
  abstract: {
    margin: 0,
    fontSize: "0.9rem",
    lineHeight: "1.2em",
    color: text.secondary,
  },
  thumbnail: {
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: "1rem",
    marginLeft: "0.4rem",
  },
}));
