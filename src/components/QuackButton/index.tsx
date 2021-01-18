import { ButtonProps, Fab, FabProps } from "@material-ui/core";
import React from "react";
import { IoCreate } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { RoundedButton } from "..";
import { useRouter } from "../../hooks/useRouter";
import { RouteStateType } from "../../routes";
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

  const history = useHistory<RouteStateType>();
  const router = useRouter(history);

  return variant === "fab" ? (
    <Fab
      color="primary"
      aria-label="compose-quack"
      size="medium"
      onClick={() => router.openComposeQuackModal()}
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
      onClick={() => router.openComposeQuackModal()}
      {...buttonProps}
    >
      Quack
    </RoundedButton>
  );
};

export { QuackButton };
