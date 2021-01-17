import { makeStyles } from "@material-ui/core/styles";
import React from "react";
type ConnectingBarProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ConnectingBar: React.FC<ConnectingBarProps> = ({
  children,
  ...props
}) => {
  const useStyles = makeStyles(({ palette: { text } }) => ({
    connectingBar: {
      width: 2,
      flex: 1,
      marginTop: "0.4rem",
      background: text.primary,
      opacity: 0.2,
    },
  }));
  const classes = useStyles();

  return <div className={classes.connectingBar} {...props} />;
};

export { ConnectingBar };
