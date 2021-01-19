import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  paper: {
    minHeight: 100,
  },
  noData: {
    width: "100%",
    height: "100%",
    padding: "1rem",
    textAlign: "center",
    color: text.secondary,
  },
  loading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem 0",
  },
  listItem: {
    color: text.secondary,
    textTransform: "unset",
  },
}));
