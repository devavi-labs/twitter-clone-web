import { Button, ButtonProps } from "@material-ui/core";
import React from "react";

export const RoundedButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      style={{
        borderRadius: "1000px",
        textTransform: "unset",
        padding: "0.6em",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
