import { ButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { IconType } from "react-icons";
import { RoundedButton } from ".";
import { hexToRgb } from "../utils/hexToRgb";

interface TabButtonProps {
  icon: IconType;
  activeIcon: IconType;
  label: string;
  isActive?: Boolean;
}

export const TabButton: React.FC<TabButtonProps & ButtonProps> = ({
  icon: Icon,
  activeIcon: ActiveIcon,
  label,
  isActive = false,
  ...props
}) => {
  const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
    root: {
      margin: 0,
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: isActive ? primary.main : text.primary + " !important",
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
    },
  }));

  const classes = useStyles();
  return (
    <RoundedButton
      className={classes.root}
      disableRipple
      disableElevation
      {...props}
    >
      {isActive ? (
        <ActiveIcon className={classes.icon} />
      ) : (
        <Icon className={classes.icon} />
      )}
      {label}
    </RoundedButton>
  );
};
