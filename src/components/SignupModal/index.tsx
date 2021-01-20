import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import { BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Logo, Modal, SignupForm } from "..";
import { useStyles } from "./styles";

interface SignupModalProps {
  open?: boolean;
  onClose?: () => any;
}

export const SignupModal: React.FC<SignupModalProps> = ({
  open = true,
  onClose,
}) => {
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
