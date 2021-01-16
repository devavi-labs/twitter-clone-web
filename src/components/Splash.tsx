import { Modal, Paper } from "@material-ui/core";
import { Logo } from ".";
import { makeStyles } from "@material-ui/core/styles";

export const Splash: React.FC<any> = () => {
  const useStyles = makeStyles(({ palette: { primary } }) => ({
    root: {},
    paper: {
      backgroundColor: primary.main,
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      outline: "none",
      "&:focus": {
        outline: "none",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Modal open className={classes.root}>
      <Paper className={classes.paper}>
        <Logo size="sm" variant="white" />
      </Paper>
    </Modal>
  );
};
