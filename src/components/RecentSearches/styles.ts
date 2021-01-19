import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
  },
  avatar: {
    backgroundColor: text.secondary,
  },
  listItem: {
    textTransform: "none",
    color: text.secondary,
  },
}));
