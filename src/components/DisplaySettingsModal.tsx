import {
  FormControl,
  FormLabel,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { Modal } from ".";
import { ThemeContext } from "../context/theme";
import { hexToRgb } from "../utils/hexToRgb";
import { RoundedButton } from "./RoundedButton";
import { SampleQuack } from "./SampleQuack";
import { ThemeBox } from "./ThemeBox";

interface DisplaySettingsModalProps {
  open: boolean;
  onClose: () => any;
}

export const DisplaySettingsModal: React.FC<DisplaySettingsModalProps> = ({
  open,
  onClose,
}) => {
  const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    heading: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginTop: "1rem",
      color: text.primary,
      margin: "0 auto",
    },
    subHeading: {
      textAlign: "center",
      fontSize: "0.9rem",
      marginTop: "-0.5rem",
      color: text.primary,
      opacity: 0.7,
    },
    group: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "1rem 0",
    },
    groupLabel: {
      fontSize: "0.8rem",
      fontWeight: "bold",
      opacity: 0.6,
      alignSelf: "flex-start",
      margin: "0.5rem 0",
      color: text.primary + " !important",
    },
    settingsContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "nowrap",
      gap: "1rem",
      background: hexToRgb(primary.main, 0.2),
      borderRadius: "1rem",
      padding: "0.5rem 1rem",
    },
    themeBox: {
      width: "50%",
      height: "60px",
      margin: 0,
      borderRadius: "4px",
    },
    selected: {
      border: "2px solid",
      borderColor: primary.main,
    },
    light: {
      background: "#fff",
      color: "#000",
      fontWeight: "bold",
    },
    dark: {
      background: "#000",
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: "bold",
    },
    label: {
      fontSize: "0.9rem",
      fontWeight: "bold",
    },
    radio: {
      marginRight: "1rem",
    },
    icon: {
      color: primary.main,
    },
  }));
  const classes = useStyles();
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTheme((event.target as HTMLInputElement).value as "dark" | "light");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      header={
        <Typography className={classes.heading}>Customize your view</Typography>
      }
      disableBackdropClick={false}
    >
      <>
        <Typography className={classes.subHeading}>
          Manage your font size, color and background. These settings affect all
          the Twitter accounts on this browser.
        </Typography>
        <SampleQuack />
        <FormControl component="fieldset" className={classes.group}>
          <FormLabel component="legend" className={classes.groupLabel}>
            Background
          </FormLabel>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={theme}
            onChange={handleChange}
            className={classes.settingsContainer}
          >
            <ThemeBox theme="light" selected={theme === "light"} />
            <ThemeBox theme="dark" selected={theme === "dark"} />
          </RadioGroup>
        </FormControl>

        <RoundedButton color="primary" variant="contained" onClick={onClose}>
          Done
        </RoundedButton>
      </>
    </Modal>
  );
};
