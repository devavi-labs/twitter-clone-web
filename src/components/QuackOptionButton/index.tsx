import { IconButton } from "@material-ui/core";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { RegularQuackFragment } from "../../generated/graphql";
import { QuackOptionPopper } from "..";
import { usePopper } from "../../hooks/usePopper";
import { useStyles } from "./styles";

type QuackOptionButtonProps = {
  quack: RegularQuackFragment;
};

const QuackOptionButton: React.FC<QuackOptionButtonProps> = ({ quack }) => {
  const classes = useStyles();

  const { open, handleClick, anchorEl, onClose } = usePopper();

  return (
    <React.Fragment>
      <IconButton className={classes.optionsButton} onClick={handleClick}>
        <BsThreeDots />
      </IconButton>
      <QuackOptionPopper
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        quack={quack}
      />
    </React.Fragment>
  );
};

export { QuackOptionButton };
