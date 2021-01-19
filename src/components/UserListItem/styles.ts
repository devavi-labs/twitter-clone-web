import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { text } }) => ({
  listItem: {
    color: text.secondary,
    textTransform: "unset",
  },
}));
