import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({ palette: { primary, secondary }, breakpoints: { up, down } }) => ({
    banner: {
      position: "fixed",
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: primary.main,
      zIndex: 1250,
    },
    innerBanner: {
      minHeight: 64,
      width: "100%",
      maxWidth: 1440,
      margin: "0 auto",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      paddingLeft: "4rem",
      paddingRight: "4rem",
      justifyContent: "space-between",
      [up("lg")]: {
        paddingLeft: "300px !important",
      },
      [up("md")]: {
        paddingLeft: "6rem",
      },
      [down("xs")]: {
        paddingLeft: 4,
        paddingRight: 4,
      },
      "& *": {
        margin: 0,
      },
    },
    texts: {
      [down("xs")]: {
        display: "none",
      },
    },
    heading: {
      fontSize: "1.3rem",
    },
    buttons: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      [down("xs")]: {
        width: "100%",
      },
    },
    button: {
      paddingLeft: "1rem !important",
      paddingRight: "1rem !important",
      [down("xs")]: {
        width: "100%",
      },
    },
    loginButton: {
      color: "white !important",
      borderColor: "white !important",
    },
    signupButton: {
      color: primary.main + " !important",
    },
  })
);
