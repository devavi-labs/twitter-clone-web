import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(
  ({ palette: { primary, type, secondary, text } }) => ({
    searchBar: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      borderRadius: 24,
      padding: "0 16px",
      backgroundColor: type === "dark" ? "#15181C" : "#e3e6e7",
      color: text.primary,
      fontSize: "0.9rem",
    },
    focused: {
      backgroundColor: secondary.main,
      border: "1px solid",
      borderColor: primary.main,
    },
    icon: {
      color: text.secondary,
      fontSize: "1rem",
    },
    clearButton: {
      backgroundColor: primary.main,
      color: secondary.main,
      "&:hover": {
        backgroundColor: primary.dark,
      },
      "&:focus": {
        backgroundColor: primary.dark,
      },
    },
  })
);
