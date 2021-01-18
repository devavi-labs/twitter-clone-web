import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({
    palette: { primary, secondary, text, type },
    breakpoints: { down, up },
  }) => ({
    appbar: {
      position: "sticky",
      [down("xs")]: {
        position: "static",
      },
    },
    root: {
      padding: "0 1rem",
      display: "flex",
      alignItems: "center",
      height: "50px",
      backgroundColor: secondary.main,
      [down("xs")]: {
        padding: "0 0.2rem",
      },
    },
    prefix: {
      marginRight: "1rem",
      [down("xs")]: {
        marginRight: "0.4rem",
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
