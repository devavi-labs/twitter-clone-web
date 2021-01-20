import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
  root: {
    backgroundColor: `${
      type === "dark" ? primary.light : text.primary
    } !important`,
    opacity: "0.2 !important",
  },
}));
