import { Modal, Paper } from "@material-ui/core";
import { Logo } from "..";
import { useStyles } from "./styles";

export const Splash: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <Modal open>
      <Paper className={classes.paper}>
        <Logo size="sm" variant="white" />
      </Paper>
    </Modal>
  );
};
