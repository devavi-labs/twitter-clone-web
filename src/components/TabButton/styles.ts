import { makeStyles, Theme } from "@material-ui/core/styles";
import { TabButtonProps } from ".";
import { hexToRgb } from "../../utils/hexToRgb";

export const useStyles = makeStyles<
  Theme,
  Pick<TabButtonProps, "isActive"> & {
    hovered: boolean;
    focused: boolean;
  }
>(({ palette: { primary, text, type }, breakpoints: { down } }) => ({
  root: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: ({ isActive }) =>
      isActive ? primary.main : text.primary + " !important",
    paddingTop: "0.4rem !important",
    paddingBottom: "0.4rem !important",
    paddingRight: "2rem !important",
    "&:hover": {
      background: hexToRgb(primary.main, 0.1),
      color: primary.main + " !important",
    },
    "&:focus": {
      background: hexToRgb(primary.main, 0.1),
      color: primary.main + " !important",
    },
    transition: "all 200ms !important",
    opacity: type === "dark" ? 0.8 : 1,
  },
  icon: {
    fontSize: "1.5rem",
    marginRight: "0.8em",
    color: ({ isActive, hovered, focused }) =>
      isActive || focused || hovered ? primary.main : text.primary,
    transition: "color 200ms !important",
    [down("md")]: {
      marginRight: 0,
    },
  },
}));
