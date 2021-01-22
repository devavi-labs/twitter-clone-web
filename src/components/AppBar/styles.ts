import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({
    palette: { primary, secondary, text, type },
    breakpoints: { down, up },
  }) => ({
    appbar: {
      position: "sticky",
      backgroundColor: secondary.main,
      [down("xs")]: {
        position: "static",
      },
    },
    root: {
      padding: "0 1rem",
      display: "flex",
      alignItems: "center",
      height: "50px",
      [down("xs")]: {
        padding: "0 0.5rem",
      },
    },
    prefix: {
      marginRight: "1rem",
      [down("xs")]: {
        marginRight: "0rem",
      },
    },
    drawerToggleBtn: {
      [up("sm")]: {
        display: "none",
      },
    },
    backIcon: {
      color: primary.main,
    },
    avatar: {
      width: 30,
      height: 30,
    },
    title: {
      color: text.primary,
      opacity: type === "dark" ? 0.8 : 1,
      fontSize: "1.1rem",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    subtitle: {
      color: text.secondary,
      fontSize: "0.8rem",
    },
  })
);
