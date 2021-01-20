import { makeStyles, Theme } from "@material-ui/core/styles";
import { ReplyingSubheaderProps } from ".";

export const useStyles = makeStyles<
  Theme,
  Pick<ReplyingSubheaderProps, "size">
>(({ palette: { text, primary } }) => ({
  root: {
    color: text.secondary,
    fontSize: ({ size }) =>
      size === "xs" ? "0.75rem" : size === "sm" ? "0.8rem" : "0.9rem",
  },
  username: {
    color: primary.main,
    fontWeight: "bold",
    opacity: "1 !important",
  },
}));
