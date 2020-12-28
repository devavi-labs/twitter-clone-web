import { Button, ButtonProps, useTheme } from "@material-ui/core";
import React from "react";

export const RoundedButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();
  return (
    <Button
      style={{
        borderRadius: "1000px",
        textTransform: "unset",
        padding: "0.6em",
        color: props.variant === "contained" ? "white" : main,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
