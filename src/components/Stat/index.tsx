import { Link } from "@material-ui/core";
import numeral from "numeral";
import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { useStyles } from "./styles";

type StatProps = {
  label: string;
  stat: number;
  href?: string;
};

const Stat: React.FC<StatProps> = ({ label, stat, href }) => {
  const classes = useStyles();

  const child = (
    <React.Fragment>
      <span className={classes.stat}>
        {numeral(stat).format(stat > 10000 ? "0 a" : "0,0") + " "}
      </span>
      <span className={classes.label}>{label}</span>
    </React.Fragment>
  );

  if (href) {
    return (
      <Link component={RouteLink} to={href} className={classes.root}>
        {child}
      </Link>
    );
  } else return <div className={classes.root}>{child}</div>;
};

export { Stat };
