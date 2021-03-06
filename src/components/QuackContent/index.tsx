import { Typography } from "@material-ui/core";
import React from "react";
import { QuackContentType } from "../../types";
import { parse } from "../../utils/quackContentParser";
import { useStyles } from "./styles";

export type QuackContentProps = {
  variant?: "contained" | "open" | "reply" | "replying-to";
  onClick?: () => void;
} & QuackContentType;

export const QuackContent: React.FC<QuackContentProps> = ({
  variant,
  text,
  onClick,
}) => {
  const classes = useStyles({ variant });
  return (
    <div className={classes.root} onClick={onClick}>
      <Typography className={classes.text}>
        {parse(text).map((e, i) => {
          if (typeof e !== "string") {
            return <React.Fragment key={i}>{e}</React.Fragment>;
          }
          return e;
        })}
      </Typography>
    </div>
  );
};
