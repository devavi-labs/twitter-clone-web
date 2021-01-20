import React from "react";
import { useStyles } from "./styles";

type ConnectingBarProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ConnectingBar: React.FC<ConnectingBarProps> = ({
  children,
  ...props
}) => {
  const classes = useStyles();

  return <div className={classes.connectingBar} {...props} />;
};

export { ConnectingBar };
