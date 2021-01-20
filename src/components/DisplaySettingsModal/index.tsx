import {
  FormControl,
  FormLabel,
  IconButton,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Modal, RoundedButton, SampleQuack, ThemeBox } from "..";
import { useLocalTheme, useMediaQuery } from "../../hooks";
import { useStyles } from "./styles";

interface DisplaySettingsModalProps {
  open?: boolean;
  onClose?: () => any;
}

export const DisplaySettingsModal: React.FC<DisplaySettingsModalProps> = ({
  open = true,
  onClose,
}) => {
  const { xs } = useMediaQuery();

  const classes = useStyles();
  const [{ theme }, { toggle }] = useLocalTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggle((event.target as HTMLInputElement).value as "dark" | "light");
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
