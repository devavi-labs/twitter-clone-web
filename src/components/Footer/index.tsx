import React from "react";
import { useStyles } from "./styles";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <span className={classes.copyrightText}>
        © {new Date().getFullYear().toString()} Quacker
      </span>
    </div>
  );
};

export { Footer };
