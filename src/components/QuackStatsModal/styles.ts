import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({ palette: { primary, text }, breakpoints: { down } }) => ({
    header: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    backIcon: {
      color: primary.main,
    },
    heading: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: text.primary,
      margin: "0 auto",
    },
    body: {
      display: "flex",
      justifyContent: "stretch",
    },
  })
);
