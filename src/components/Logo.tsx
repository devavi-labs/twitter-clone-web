import { Box } from "@material-ui/core";
import React from "react";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "blue" | "white" | "main";
}

export const Logo: React.FC<LogoProps> = ({
  size = "xs",
  variant = "white",
}) => {
  let sizepx: string = "36px";
  let image: string = "logo-white192.png";

  switch (size) {
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
      image = "logo-white192.png";
  }

  return (
    <Box
      width={sizepx}
      height={sizepx}
      style={{
        backgroundImage: `url("${image}")`,
        backgroundSize: "100%",
      }}
    />
  );
};
