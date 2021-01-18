import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ breakpoints: { down } }) => ({
  createQuack: {
    [down("xs")]: {
      display: "none",
    },
  },
}));
