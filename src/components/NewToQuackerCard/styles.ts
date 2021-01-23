import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { divider, text } }) => ({
  card: {
    margin: "0.5rem",
    padding: "0.4rem",
    borderWidth: 1,
    borderColor: divider,
    borderStyle: "solid",
    borderRadius: "1rem",
  },
  heading: {
    margin: "0.4rem",
    fontSize: "1.2rem",
  },
  text: {
    color: text.secondary,
    margin: "0.4rem 0",
  },
}));
