import { makeStyles, Theme } from "@material-ui/core/styles";
import { EngageButtonProps } from ".";
import { hexToRgb } from "../../utils/hexToRgb";

export const useStyles = makeStyles<
  Theme,
  Pick<EngageButtonProps, "size" | "status"> & {
    hovered: boolean;
    focused: boolean;
    color: "#108510" | "#ff0088" | undefined;
  }
>(({ palette: { primary, text } }) => ({
  root: {
    fontSize: "0.8rem",
    color: ({ hovered, focused, color }) =>
      (hovered || focused) && color ? color : text.primary,
  },
  button: {
    width: ({ size }) => (size === "sm" ? 32 : 34),
    height: ({ size }) => (size === "sm" ? 32 : 34),
    padding: 8,
    "&:hover": {
      background: ({ color }) => hexToRgb(color || primary.main, 0.1),
      color: ({ color }) => color || primary.main + " !important",
    },
    "&:focus": {
      background: ({ color }) => hexToRgb(color || primary.main, 0.1),
      color: ({ color }) => color || primary.main + " !important",
    },
  },
  icon: {
    color: ({ color, status }) => (status && color ? color : "inherit"),
  },
}));
