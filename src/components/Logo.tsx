import { Box, BoxProps, useTheme } from "@material-ui/core";
import React from "react";

interface LogoProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "blue" | "white" | "main";
}

export const Logo: React.FC<LogoProps & BoxProps> = ({
  size,
  variant,
  ...props
}) => {
  const {
    palette: { type },
  } = useTheme();

  let sizepx: string = "36px";
  let image: string =
    type === "dark" ? "logo-white192.png" : "logo-blue192.png";

  switch (size) {
    case "xxs":
      sizepx = "24px";
      break;
    case "xs":
      sizepx = "36px";
      break;
    case "sm":
      sizepx = "48px";
      break;
    case "md":
      sizepx = "56px";
      break;
    case "lg":
      sizepx = "64px";
      break;
    case "xl":
      sizepx = "72px";
      break;
    default:
      sizepx = "36px";
  }

  switch (variant) {
    case "blue":
      image = "logo-blue192.png";
      break;
    case "white":
      image = "logo-white192.png";
      break;
    case "main":
      image = "logo192.png";
      break;
    default:
      image = type === "dark" ? "logo-white192.png" : "logo-blue192.png";
  }

  return (
    <Box
      style={{
        backgroundImage: `url("${image}")`,
        backgroundSize: "100%",
        width: sizepx,
        height: sizepx,
      }}
      {...props}
    />
  );
};
