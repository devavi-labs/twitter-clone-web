import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({ palette: { secondary }, breakpoints: { down } }) => ({
    rightSidebar: {
      backgroundColor: secondary.main,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      padding: "0 2.5rem 2.5rem 1rem",
      overflowY: "hidden",
      [down("md")]: {
        padding: "0.4rem",
      },
      [down("sm")]: {
        display: "none",
      },
    },
    feed: {
      width: "100%",
      padding: "1rem",
    },
  })
);
