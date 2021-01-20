import { makeStyles } from "@material-ui/core/styles";
import { hexToRgb } from "../../utils/hexToRgb";

export const useStyles = makeStyles(
  ({ palette: { primary, text, type }, breakpoints: { down } }) => ({
    accountButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "&:hover": {
        background: hexToRgb(primary.main, 0.1),
        color: primary.main + " !important",
      },
      "&:focus": {
        background: hexToRgb(primary.main, 0.1),
        color: primary.main + " !important",
      },
    },
    body: {
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      marginRight: "0.4em",
      height: "3rem",
      width: "3rem",
      [down("md")]: {
        marginRight: 0,
        height: 42,
        width: 42,
      },
    },
    dots: {
      color: text.primary,
      fontSize: "1.5rem",
      opacity: type === "dark" ? 0.8 : 1,
    },
  })
);
