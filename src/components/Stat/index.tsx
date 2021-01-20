import { Link } from "@material-ui/core";
import numeral from "numeral";
import React from "react";
import { useStyles } from "./styles";

type StatProps = {
  label: string;
  stat: number;
  href?: string;
};

const Stat: React.FC<StatProps> = ({ label, stat, href }) => {
  const classes = useStyles();

  return (
    <Link href={href} className={classes.root}>
      <span className={classes.stat}>
        {numeral(stat).format(stat > 10000 ? "0 a" : "0,0") + " "}
      </span>
      <span className={classes.label}>{label}</span>
    </Link>
  );
};

export { Stat };
