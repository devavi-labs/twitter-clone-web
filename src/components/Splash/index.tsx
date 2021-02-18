import { CircularProgress, Grow, Modal, Paper } from "@material-ui/core";
import { Logo } from "..";
import { useStyles } from "./styles";
import React from "react";

export const Splash: React.FC<any> = () => {
  const classes = useStyles();

  const [showDelayMessage, setShowDelayMessage] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShowDelayMessage(true);
    }, 1000 * 10);
  }, []);

  return (
    <Modal open>
      <Paper className={classes.paper}>
        <div className={classes.logoContainer}>
          <Grow in={showDelayMessage} mountOnEnter>
            <CircularProgress
              variant="indeterminate"
              className={classes.progress}
              size={64}
              thickness={2}
            />
          </Grow>
          <Logo size={showDelayMessage ? "xs" : "sm"} variant="white" />
        </div>
        <Grow in={showDelayMessage} mountOnEnter>
          <div className={classes.serverDelayMessageContainer}>
            <p className={classes.serverDelayMessage}>
              So sorry for the delay... The server is hosted in a free hobby
              plan and it sleeps after inactivity of 30 minutes. So the boot-up
              could take a little while.
            </p>
          </div>
        </Grow>
      </Paper>
    </Modal>
  );
};
