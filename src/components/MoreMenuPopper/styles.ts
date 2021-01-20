import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0 !important",
  },
  icon: {
    color: text.primary,
  },
  text: {
    marginLeft: "-2rem",
    textTransform: "initial",
    color: text.primary,
  },
}));
