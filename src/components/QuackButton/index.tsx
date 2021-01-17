import { Fab, FabProps, ButtonProps } from "@material-ui/core";
import React, { useContext } from "react";
import { IoCreate } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { RoundedButton } from "..";
import { FeedContext } from "../../context/feed";
import { useStyles } from "./styles";

type QuackButtonProps = {
  variant?: "fab" | "button";
  fabProps?: Omit<Partial<FabProps>, "onClick">;
  buttonProps?: Omit<Partial<ButtonProps>, "onClick">;
};

const QuackButton: React.FC<QuackButtonProps> = ({
  variant,
  fabProps,
  buttonProps,
}) => {
  const classes = useStyles();

  const history = useHistory();

  const { state } = useContext(FeedContext)!;

  const onCQClick = () =>
    history.push("/compose/quack", {
      popup: "compose-quack",
      feed: state?.feed,
      username: state?.username,
      tab: state?.tab,
    });

  return variant === "fab" ? (
    <Fab
      color="primary"
      aria-label="compose-quack"
      size="medium"
      onClick={onCQClick}
      {...fabProps}
    >
      <IoCreate className={classes.createIcon} />
    </Fab>
  ) : (
    <RoundedButton
      color="primary"
      variant="contained"
      disableElevation
      fullWidth
      className={classes.quackButton}
      onClick={onCQClick}
      {...buttonProps}
    >
      Quack
    </RoundedButton>
  );
};

export { QuackButton };
