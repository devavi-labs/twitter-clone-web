import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    minWidth: 200,
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "0 !important",
  },
  icon: {
    color: text.primary,
    fontSize: "1rem",
  },
  text: {
    fontSize: "0.8rem",
    marginLeft: "-2rem",
    textTransform: "initial",
    color: text.primary,
  },
}));
