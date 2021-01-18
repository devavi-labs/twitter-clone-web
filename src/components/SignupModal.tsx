import { IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsX } from "react-icons/bs";
import { Modal, SignupForm } from ".";
import { Logo } from "./Logo";
import { useHistory } from "react-router-dom";

interface SignupModalProps {
  open?: boolean;
  onClose?: () => any;
}

export const SignupModal: React.FC<SignupModalProps> = ({
  open = true,
  onClose,
}) => {
  const useStyles = makeStyles(({ palette: { type } }) => ({
    logo: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      alignSelf: "flex-start",
      margin: "0.5rem 0",
      opacity: type === "dark" ? 0.8 : 1,
    },
  }));

  const classes = useStyles();

  const { goBack } = useHistory();

  return (
    <Modal
      open={open}
      onClose={onClose || goBack}
      header={
        <>
          <IconButton onClick={onClose || goBack}>
            <BsX />
          </IconButton>
          <Logo size="xxs" className={classes.logo} />
        </>
      }
      padding="0.5rem 2rem"
    >
      <>
        <Typography
          variant="h2"
          component="h2"
          id="modal-title"
          className={classes.heading}
        >
          Create your account
        </Typography>

        <SignupForm />
      </>
    </Modal>
  );
};
