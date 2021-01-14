import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { RegularQuackFragment } from "../../generated/graphql";
import { QuackOptionPopper } from "..";
import { usePopper } from "../../hooks/usePopper";

type QuackOptionButtonProps = {
  quack: RegularQuackFragment;
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

  const { open, handleClick, anchorEl, onClose } = usePopper();

  return (
    <>
      <IconButton className={classes.optionsButton} onClick={handleClick}>
        <BsThreeDots />
      </IconButton>
      <QuackOptionPopper
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        quack={quack}
      />
    </>
  );
};

export { QuackOptionButton };
