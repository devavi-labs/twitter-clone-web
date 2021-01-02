import { FormControlLabel, Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface ThemeBoxProps {
  theme: "dark" | "light";
  selected?: boolean;
}

export const ThemeBox: React.FC<ThemeBoxProps> = ({ theme, selected }) => {
  const useStyles = makeStyles(({ palette: { primary, secondary, text } }) => ({
    themeBox: {
      width: "50%",
      height: "60px",
      margin: 0,
      borderRadius: "4px",
      border: selected ? `2px solid ${primary.main}` : "",
      background: theme === "dark" ? "#000" : "#fff",
    },
    label: {
      color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "#000",
      fontSize: "0.9rem",
      fontWeight: "bold",
    },
    radio: {
      marginRight: "1rem",
      color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "#000",
    },
    icon: {
      color: primary.main,
    },
  }));
  const classes = useStyles();
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
