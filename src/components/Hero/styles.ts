import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({ palette: { secondary }, breakpoints: { down, up } }) => ({
    root: {
      flex: 4.7,
      display: "flex",
      backgroundColor: secondary.main,
      [down("md")]: {
        flex: 5,
      },
    },
    subRoot: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      [down("md")]: {
        maxWidth: 600,
      },
    },
    fab: {
      position: "fixed",
      bottom: 80,
      right: 40,
      [up("xs")]: {
        display: "none",
      },
    },
  })
);
