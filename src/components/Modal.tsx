import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Backdrop } from ".";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface ModalProps {
  open: boolean;
  onClose: () => any;
  header?: any;
  fixedHeight?: boolean;
  padding?: string;
  top?: string | number;
  left?: string | number;
  bottom?: string | number;
  right?: string | number;
}

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

  const { xs } = useMediaQuery();

  const useStyles = makeStyles(({ palette: { secondary, type } }) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      position: "absolute",
      top: xs ? undefined : top,
      left: xs ? undefined : left,
      bottom: xs ? undefined : bottom,
      right: xs ? undefined : right,
      backgroundColor: secondary.main,
      width: "100%",
      maxWidth: "600px",
      height: xs ? "100%" : fixedHeight ? "95%" : "auto",
      maxHeight: xs ? "100%" : "95%",
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
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: padding || "0.5rem",
      overflowY: "auto",
    },
    header: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      padding: xs ? "0.5rem" : "0.5rem 2rem",
      opacity: type === "dark" ? 0.8 : 1,
      fontWeight: "bold",
    },
  }));

  const classes = useStyles();

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
