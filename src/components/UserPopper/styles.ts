import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles<Theme, { followStatus: boolean }>(
  ({ palette: { primary, text, type, error } }) => ({
    root: {
      width: 300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem",
    },
    header: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.2rem",
    },
    followBtn: {
      backgroundColor: ({ followStatus }) =>
        followStatus ? error.main : primary.main,
      "&:hover": {
        backgroundColor: ({ followStatus }) =>
          followStatus ? error.dark : primary.dark,
      },
      "&:focus": {
        backgroundColor: ({ followStatus }) =>
          followStatus ? error.dark : primary.dark,
      },
    },
    profile: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    avatar: {
      marginRight: "0.4em",
      height: "3.5rem",
      width: "3.5rem",
    },
    displayName: {
      color: text.primary,
      fontWeight: "bold",
      opacity: type === "dark" ? 0.8 : 1,
    },
    username: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "0.4rem",
    },
    handle: {
      color: text.primary,
      opacity: 0.6,
      fontSize: "0.8rem",
    },
    fbChip: {
      fontSize: "0.7rem",
    },
    stats: {
      display: "flex",
      gap: "0.5rem",
      margin: "0.4rem 0",
    },
  })
);
