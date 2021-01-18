import {
  FormControl,
  FormLabel,
  IconButton,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Modal } from ".";
import { ThemeContext } from "../context/theme";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { hexToRgb } from "../utils/hexToRgb";
import { RoundedButton } from "./RoundedButton";
import { SampleQuack } from "./SampleQuack";
import { ThemeBox } from "./ThemeBox";
import { useHistory } from "react-router-dom";

interface DisplaySettingsModalProps {
  open?: boolean;
  onClose?: () => any;
}

export const DisplaySettingsModal: React.FC<DisplaySettingsModalProps> = ({
  open = true,
  onClose,
}) => {
  const { xs } = useMediaQuery();
  const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    header: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    backIcon: {
      color: primary.main,
    },
    heading: {
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginTop: xs ? 0 : "1rem",
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
      flexDirection: xs ? "column" : "row",
      alignItems: xs ? "stretch" : "center",
      justifyContent: "center",
      flexWrap: "nowrap",
      gap: xs ? "0.5rem" : "1rem",
      background: hexToRgb(primary.main, 0.2),
      borderRadius: "1rem",
      padding: "0.5rem 1rem",
    },
  }));
  const classes = useStyles();
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTheme((event.target as HTMLInputElement).value as "dark" | "light");
  };

  const { goBack } = useHistory();

  return (
    <Modal
      open={open}
      onClose={onClose || goBack}
      header={
        xs ? (
          <div className={classes.header}>
            <IconButton onClick={onClose || goBack}>
              <BsArrowLeft className={classes.backIcon} />
            </IconButton>
            <Typography className={classes.heading}>
              Customize your view
            </Typography>
          </div>
        ) : (
          <Typography className={classes.heading}>
            Customize your view
          </Typography>
        )
      }
      disableBackdropClick={false}
      padding="0.5rem 2rem"
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

        <RoundedButton
          color="primary"
          variant="contained"
          onClick={onClose || goBack}
        >
          Done
        </RoundedButton>
      </>
    </Modal>
  );
};
