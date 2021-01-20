import { FormControlLabel, Radio } from "@material-ui/core";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useStyles } from "./styles";

export type ThemeBoxProps = {
  theme: "dark" | "light";
  selected?: boolean;
};

export const ThemeBox: React.FC<ThemeBoxProps> = ({ theme, selected }) => {
  const classes = useStyles({ theme, selected });
  return (
    <FormControlLabel
      value={theme}
      control={
        <Radio
          className={classes.radio}
          checkedIcon={<FaCheckCircle className={classes.icon} />}
        />
      }
      label={theme === "light" ? "Default" : "Lights Out"}
      className={classes.themeBox}
      classes={{
        label: classes.label,
      }}
    />
  );
};
