import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({ palette: { secondary, type }, breakpoints: { down } }) => ({
    root: {
      width: 300,
      [down("md")]: {
        width: 100,
        paddingLeft: "2rem",
        paddingRight: "2rem",
      },
      [down("xs")]: {
        display: "none",
      },
    },
    paper: {
      left: "auto",
      width: 300,
      backgroundColor: secondary.main,
      display: "flex",
      flexDirection: "column",
      paddingLeft: "4rem",
      paddingRight: 0,
      alignItems: "flex-start",
      [down("md")]: {
        left: 0,
        width: 100,
        paddingLeft: "2rem",
        paddingRight: "2rem",
      },
    },
    top: {
      paddingRight: "2rem",
      width: "100%",
      [down("md")]: {
        paddingRight: 0,
      },
    },
    bottom: {
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight: "0.5rem",
      paddingBottom: "1rem",
      [down("md")]: {
        paddingRight: 0,
      },
    },
    logo: {
      opacity: type === "dark" ? 0.8 : 1,
    },
    list: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "0.8rem",
      margin: "1rem 0",
    },
  })
);
