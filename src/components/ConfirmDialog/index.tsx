import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { Backdrop, Logo, RoundedButton } from "..";
import { useStyles } from "./styles";
import { useConfirmDialog } from "../../hooks";

const ConfirmDialog: React.FC = () => {
  const [
    {
      open,
      content,
      title,
      cancelLabel,
      confirmLabel,
      danger,
      includeLogo,
      onCancel,
      onClose,
      onConfirm,
    },
  ] = useConfirmDialog();

  const classes = useStyles({ danger });

  const handleCancel = () => {
    if (onCancel) {
      onCancel?.call({});
      onClose?.call({});
    } else {
      onClose?.call({});
    }
  };

  const handleConfirm = () => {
    onConfirm?.call({});
    onClose?.call({});
  };

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
      {includeLogo && <Logo className={classes.logo} />}
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
          onClick={handleCancel}
          className={classes.cancelButton}
          fullWidth
          disableRipple
        >
          {cancelLabel}
        </RoundedButton>
        <RoundedButton
          variant="contained"
          onClick={handleConfirm}
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
