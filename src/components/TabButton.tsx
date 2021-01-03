import { ButtonProps, IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { RoundedButton } from ".";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { hexToRgb } from "../utils/hexToRgb";

interface TabButtonProps {
  icon: IconType;
  activeIcon: IconType;
  label: string;
  isActive?: Boolean;
}

export const TabButton: React.FC<
  TabButtonProps & ButtonProps & IconButtonProps
> = ({
  icon: Icon,
  activeIcon: ActiveIcon,
  label,
  isActive = false,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const { md } = useMediaQuery();
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
      marginRight: !md ? "0.8em" : 0,
      color: isActive || focused || hovered ? primary.main : text.primary,
      transition: "color 200ms !important",
    },
  }));

  const classes = useStyles();
  if (md) {
    return (
      <IconButton
        {...props}
        onMouseOver={() => setHovered(true)}
        onMouseDown={() => setFocused(true)}
        onMouseLeave={() => setHovered(false)}
        onBlur={() => setFocused(false)}
      >
        {isActive ? (
          <ActiveIcon className={classes.icon} />
        ) : (
          <Icon className={classes.icon} />
        )}
      </IconButton>
    );
  }

  return (
    <RoundedButton
      className={classes.root}
      disableRipple
      disableElevation
      {...props}
      onMouseOver={() => setHovered(true)}
      onMouseDown={() => setFocused(true)}
      onMouseLeave={() => setHovered(false)}
      onBlur={() => setFocused(false)}
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
