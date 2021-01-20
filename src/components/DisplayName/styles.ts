import { makeStyles, Theme } from "@material-ui/core/styles";
import { DisplayNameProps } from ".";
import { truncatedTextStyle } from "../../utils/truncatedTextStyle";

export const useStyles = makeStyles<
  Theme,
  Pick<DisplayNameProps, "direction" | "size">
>(({ palette: { text, primary, type } }) => ({
  names: {
    display: "flex",
    flexDirection: ({ direction }) =>
      direction === "vertical" ? "column" : "row",
    alignItems: ({ direction }) =>
      direction === "vertical" ? "flex-start" : "center",
    gap: ({ direction }) => (direction === "vertical" ? 0 : "0.2rem"),
  },
  primaryText: {
    color: text.primary,
    opacity: 0.9,
    fontSize: ({ size }) =>
      size === "xs"
        ? "0.8rem"
        : size === "sm"
        ? "0.9rem"
        : size === "md"
        ? "1rem"
        : "1.2rem",
    fontWeight: "bold",
    ...truncatedTextStyle(),
  },
  verifiedBadge: {
    marginLeft: "0.2rem",
    color: type === "dark" ? text.primary : primary.main,
    fontSize: ({ size }) =>
      size === "xs"
        ? "1.1rem"
        : size === "sm"
        ? "1.2rem"
        : size === "md"
        ? "1.3rem"
        : "1.4rem",
  },
  secondaryText: {
    color: text.secondary,
    fontSize: ({ size }) =>
      size === "xs"
        ? "0.75rem"
        : size === "sm"
        ? "0.8rem"
        : size === "md"
        ? "0.9rem"
        : "0.95rem",
    ...truncatedTextStyle(),
  },
}));
