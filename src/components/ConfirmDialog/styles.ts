import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles<Theme, { danger: boolean | undefined }>(
  ({ palette: { primary, error } }) => ({
    root: {
      position: "relative",
      padding: "1rem",
    },
    paper: {
      width: "100%",
      maxWidth: 400,
      margin: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate( -50%, -50%)",
      borderRadius: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0.5rem",
    },
    logo: {
      marginTop: "1rem",
    },
    contentText: {
      textAlign: "center",
      fontSize: "0.9rem",
    },
    actions: {
      width: "100%",
    },
    cancelButton: {
      backgroundColor: "#222121",
      "&:hover": {
        backgroundColor: "#363535",
      },
      "&:focus": {
        backgroundColor: "#363535",
      },
    },
    confirmButton: {
      backgroundColor: ({ danger }) => (danger ? error.main : primary.main),
      "&:hover": {
        backgroundColor: ({ danger }) => (danger ? error.dark : primary.dark),
      },
      "&:focus": {
        backgroundColor: ({ danger }) => (danger ? error.dark : primary.dark),
      },
    },
  })
);
