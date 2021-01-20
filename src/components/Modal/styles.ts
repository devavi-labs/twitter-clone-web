import { makeStyles, Theme } from "@material-ui/core/styles";
import { ModalProps } from ".";

export const useStyles = makeStyles<
  Theme,
  Pick<
    ModalProps,
    "top" | "bottom" | "left" | "right" | "fixedHeight" | "padding"
  >
>(({ palette: { secondary, type }, breakpoints: { up, down } }) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: secondary.main,
    width: "100%",
    maxWidth: "600px",
    height: ({ fixedHeight }) => (fixedHeight ? "95%" : "auto"),
    maxHeight: "95%",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    outline: "none",
    "&:focus": {
      outline: "none",
    },
    [up("sm")]: {
      top: ({ top }) => top,
      left: ({ left }) => left,
      bottom: ({ bottom }) => bottom,
      right: ({ right }) => right,
    },
    [down("xs")]: {
      height: "100% !important",
      maxHeight: "100%",
      borderRadius: "unset",
    },
  },
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: ({ padding }) => padding || "0.5rem",
    overflowY: "auto",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 2rem",
    opacity: type === "dark" ? 0.8 : 1,
    fontWeight: "bold",
    [down("xs")]: {
      padding: "0.5rem",
    },
  },
}));
