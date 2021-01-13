import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Backdrop, RoundedButton } from "..";

type ConfirmDialogProps = {
  title: string;
  content: string;
  open: boolean;
  onClose?: () => any;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => any;
  onConfirm?: () => any;
  danger?: boolean;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  content,
  open,
  onClose,
  onConfirm = onClose,
  onCancel = onClose,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = true,
}) => {
  const useStyles = makeStyles(({ palette: { primary, error } }) => ({
    root: {
      position: "relative",
      padding: "1rem",
    },
    paper: {
      width: "100%",
      maxWidth: 400,
      margin: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate( -50%, -50%)",
      borderRadius: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0.5rem",
    },

    contentText: {
      textAlign: "center",
      fontSize: "0.9rem",
    },
    actions: {
      width: "100%",
    },
    cancelButton: {
      backgroundColor: "#222121",
      "&:hover": {
        backgroundColor: "#363535",
      },
      "&:focus": {
        backgroundColor: "#363535",
      },
    },
    confirmButton: {
      backgroundColor: danger ? error.main : primary.main,
      "&:hover": {
        backgroundColor: danger ? error.dark : primary.dark,
      },
      "&:focus": {
        backgroundColor: danger ? error.dark : primary.dark,
      },
    },
  }));
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      className={classes.root}
      BackdropComponent={Backdrop}
      classes={{
        container: classes.root,
        paper: classes.paper,
      }}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="confirmation-dialog-description"
          className={classes.contentText}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <RoundedButton
          variant="contained"
          onClick={onCancel}
          className={classes.cancelButton}
          fullWidth
          disableRipple
        >
          {cancelLabel}
        </RoundedButton>
        <RoundedButton
          variant="contained"
          onClick={onConfirm}
          className={classes.confirmButton}
          fullWidth
          disableRipple
        >
          {confirmLabel}
        </RoundedButton>
      </DialogActions>
    </Dialog>
  );
};

export { ConfirmDialog };
