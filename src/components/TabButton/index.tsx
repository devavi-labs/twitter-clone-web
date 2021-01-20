import { ButtonProps, IconButton, IconButtonProps } from "@material-ui/core";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { RoundedButton } from "..";
import { useMediaQuery } from "../../hooks";
import { useStyles } from "./styles";

export type TabButtonProps = {
  icon: IconType;
  activeIcon: IconType;
  label: string;
  isActive?: Boolean;
};

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

  const classes = useStyles({ hovered, focused, isActive });

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
