import React from "react";
import { useHistory } from "react-router-dom";
import { SignupButton } from "..";
import { useRouter } from "../../hooks";
import { useStyles } from "./styles";

const NewToQuackerCard: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const router = useRouter(history);

  return (
    <div className={classes.card}>
      <h2 className={classes.heading}>New to Quacker?</h2>
      <p className={classes.text}>
        Sign up now to get your own personalized timeline!
      </p>
      <SignupButton onClick={router.openSignupModal} />
    </div>
  );
};

export { NewToQuackerCard };
