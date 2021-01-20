import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  root: {
    color: text.primary,
  },
  stat: {
    fontWeight: "bold",
  },
  label: {
    color: text.secondary,
  },
}));
