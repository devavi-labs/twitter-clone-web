import { makeStyles, Theme } from "@material-ui/core/styles";
import { QuackLayoutProps } from ".";

export const useStyles = makeStyles<
  Theme,
  Pick<QuackLayoutProps, "variant"> & { clickable?: boolean }
>(({ palette: { type } }) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    textTransform: "unset",
    padding: "0 0.2rem !important",
    cursor: ({ clickable }) => (clickable ? "pointer" : "initial"),
    transition: "background 0.2s ease-in",
    outline: "none",
    "&:hover": {
      background: ({ clickable }) =>
        clickable
          ? type === "light"
            ? "rgba(0,0,0,0.02)"
            : "rgba(255,255,255,0.052)"
          : "initial",
      outline: "none",
    },
    "&:focus": {
      background: ({ clickable }) =>
        clickable
          ? type === "light"
            ? "rgba(0,0,0,0.02)"
            : "rgba(255,255,255,0.052)"
          : "initial",
      outline: "none",
    },
  },
  left: {
    width: ({ variant }) => (variant !== "open" ? 52 : 0),
    minHeight: ({ variant }) => (variant === "replying-to" ? 80 : 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "0.4rem !important",
  },
  right: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    paddingLeft: "0.4rem",
  },
}));
