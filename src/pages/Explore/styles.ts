import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ breakpoints: { down } }) => ({
  explore: {
    flexGrow: 1,
    width: "100%",
  },
  tabs: {
    maxWidth: 600,
    [down("xs")]: {
      maxWidth: "100vw",
    },
  },
  tab: {
    textTransform: "none",
    fontWeight: "bold",
  },
}));
