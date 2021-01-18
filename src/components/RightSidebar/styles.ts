import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({ palette: { secondary }, breakpoints: { down } }) => ({
    rightSidebar: {
      width: "100%",
      maxWidth: 420,
      [down("md")]: {
        display: "none",
      },
    },
    paper: {
      backgroundColor: secondary.main,
      display: "flex",
      flexDirection: "column",
      paddingLeft: "4rem",
      paddingRight: 0,
      alignItems: "flex-start",
      width: "100%",
      maxWidth: 420,
      [down("md")]: {
        display: "none",
      },
    },
  })
);
