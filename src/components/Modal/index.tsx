import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from "@material-ui/core";
import React from "react";
import { Backdrop } from "..";
import { useStyles } from "./styles";

export type ModalProps = {
  open: boolean;
  onClose: () => any;
  header?: any;
  fixedHeight?: boolean;
  padding?: string;
  top?: string | number;
  left?: string | number;
  bottom?: string | number;
  right?: string | number;
};

export const Modal: React.FC<ModalProps & MuiModalProps> = ({
  open,
  onClose,
  header,
  fixedHeight,
  padding,
  children,
  top,
  left,
  bottom,
  right,
  ...props
}) => {
  const rootRef = React.useRef(null);

  const classes = useStyles({ bottom, fixedHeight, left, padding, right, top });

  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div ref={rootRef}>
      <MuiModal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableEnforceFocus
        container={() => rootRef.current}
        className={classes.modal}
        BackdropComponent={Backdrop}
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
