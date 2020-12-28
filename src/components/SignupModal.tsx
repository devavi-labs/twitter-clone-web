import {
  makeStyles,
  Modal,
  Typography,
  useTheme,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { Logo } from "./Logo";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { BsX } from "react-icons/bs";
import { SignupForm } from ".";

interface SignupModalProps {
  open: boolean;
  onClose: () => any;
}

export const SignupModal: React.FC<SignupModalProps> = ({ open, onClose }) => {
  const rootRef = React.useRef(null);
  const { xs } = useMediaQuery();

  const {
    palette: { type },
  } = useTheme();

  const useStyles = makeStyles(({ palette }) => ({
    backdrop: {
      backgroundColor: `${palette.text.primary} !important`,
      opacity: 0.2,
    },

    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: palette.secondary.main,
      width: "100%",
      maxWidth: "600px",
      height: xs ? "100%" : "95%",
      borderRadius: xs ? "none" : "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      outline: "none",
      "&:focus": {
        outline: "none",
      },
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0.5rem 2rem",
      overflowY: "auto",
    },
    header: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0.5rem 2rem",
      opacity: palette.type === "dark" ? 0.8 : 1,
    },

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
      opacity: palette.type === "dark" ? 0.8 : 1,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div ref={rootRef}>
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          disableScrollLock
          disableBackdropClick
          disableAutoFocus
          disablePortal
          disableEnforceFocus
          container={() => rootRef.current}
          className={classes.modal}
          BackdropProps={{
            className: classes.backdrop,
          }}
        >
          <div className={classes.paper}>
            <div className={classes.header}>
              <IconButton onClick={onClose}>
                <BsX />
              </IconButton>
              <Logo
                size="xxs"
                variant={type === "dark" ? "white" : "blue"}
                className={classes.logo}
              />
            </div>
            <div className={classes.body}>
              <Typography
                variant="h2"
                component="h2"
                id="modal-title"
                className={classes.heading}
              >
                Create your account
              </Typography>

              <SignupForm />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
