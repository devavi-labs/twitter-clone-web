import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({
    palette: {
      primary,
      background: { paper },
    },
    breakpoints: { up },
  }) => ({
    root: {
      minWidth: "70vw",
      minHeight: "100%",
      background: paper,
      display: "initial",
      [up("sm")]: {
        display: "none",
      },
    },
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 0.8rem",
    },
    heading: {
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
    closeIcon: {
      color: primary.main,
    },
    profile: {
      padding: "0.5rem 0.8rem",
    },
    avatar: {
      height: 36,
      width: 36,
      marginBottom: 8,
    },

    follow: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    followText: {
      display: "flex",
      gap: "0.2rem",
      fontSize: "0.9rem",
    },
    followStat: {
      fontSize: "0.9rem",
      fontWeight: "bold",
    },
    listIcon: {
      fontSize: "1rem",
    },
    listText: {
      marginLeft: "-2rem",
      textTransform: "capitalize",
      fontSize: "0.9rem",
    },
    logoutText: {
      textTransform: "capitalize",
      fontSize: "0.9rem",
    },
  })
);
