import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { primary } }) => ({
  root: {
    "& > .MuiSnackbarContent-root": {
      backgroundColor: primary.main,
      color: "#fff",
      fontWeight: "bold",
    },
  },
}));
