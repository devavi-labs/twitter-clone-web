import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface ModalProps {
  open: boolean;
  onClose: () => any;
  header?: any;
}

export const Modal: React.FC<ModalProps & MuiModalProps> = ({
  open,
  onClose,
  header,
  children,
  ...props
}) => {
  const rootRef = React.useRef(null);

  const { xs } = useMediaQuery();

  const useStyles = makeStyles(
    ({ palette: { primary, secondary, text, type } }) => ({
      backdrop: {
        backgroundColor: `${
          type === "dark" ? primary.light : text.primary
        } !important`,
        opacity: 0.2,
      },
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        backgroundColor: secondary.main,
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
        justifyContent: "center",
        padding: "0.5rem 2rem",
        opacity: type === "dark" ? 0.8 : 1,
        fontWeight: "bold",
      },
    })
  );

  const classes = useStyles();

  return (
    <div ref={rootRef}>
      <MuiModal
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
        {...props}
      >
        <div className={classes.paper}>
          {header && <div className={classes.header}>{header}</div>}
          <div className={classes.body}>{children}</div>
        </div>
      </MuiModal>
    </div>
  );
};
