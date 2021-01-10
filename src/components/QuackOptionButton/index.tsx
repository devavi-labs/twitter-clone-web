import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  RegularQuackFragment,
  ShortQuackFragment,
} from "../../generated/graphql";

type QuackOptionButtonProps = {
  quack: RegularQuackFragment | ShortQuackFragment;
};

const QuackOptionButton: React.FC<QuackOptionButtonProps> = ({ quack }) => {
  const useStyles = makeStyles(() => ({
    optionsButton: {
      opacity: 0.8,
      width: 36,
      height: 36,
      padding: 8,
      margin: 0,
    },
  }));
  const classes = useStyles();
  return (
    <IconButton className={classes.optionsButton}>
      <BsThreeDots />
    </IconButton>
  );
};

export { QuackOptionButton };
