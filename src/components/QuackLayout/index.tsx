import React from "react";
import { useStyles } from "./styles";

export type QuackLayoutProps = {
  variant: "contained" | "open" | "reply" | "replying-to";
  left: React.ReactNode;
  clickable?: boolean;
};

const QuackLayout: React.FC<QuackLayoutProps> = ({
  variant,
  left,
  clickable,
  children,
}) => {
  clickable =
    clickable !== undefined
      ? clickable
      : variant !== "open" && variant !== "replying-to";
  const classes = useStyles({ variant, clickable });

  return (
    <div className={classes.root}>
      {variant !== "open" && <div className={classes.left}>{left}</div>}
      <div className={classes.right}>{children}</div>
    </div>
  );
};

export { QuackLayout };
