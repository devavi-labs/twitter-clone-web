import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ palette: { error } }) => ({
  red: {
    backgroundColor: error.main,
    "&:hover": {
      backgroundColor: error.dark,
    },
    "&:focus": {
      backgroundColor: error.dark,
    },
  },
}));
