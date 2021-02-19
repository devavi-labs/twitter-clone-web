import { Link } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <span className={classes.text}>
        © {new Date().getFullYear().toString()} Quacker
      </span>
      <span className={classes.text}>
        Built by <Link href="https://github.com/devavi-labs">devavi</Link>
      </span>
    </div>
  );
};

export { Footer };
