import React from "react";
import { useStyles } from "./styles";
import { RoundedButton } from "..";
import { useRouter } from "../../hooks";
import { useHistory } from "react-router-dom";

const BottomBanner: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const router = useRouter(history);
  return (
    <div className={classes.banner}>
      <div className={classes.innerBanner}>
        <div className={classes.texts}>
          <h3 className={classes.heading}>Don’t miss what’s happening</h3>
          <p>People on Quacker are the first to know.</p>
        </div>
        <div className={classes.buttons}>
          <RoundedButton
            variant="outlined"
            className={[classes.loginButton, classes.button].join(" ")}
            onClick={router.pushLoginPage}
            disableElevation
          >
            Log in
          </RoundedButton>
          <RoundedButton
            variant="contained"
            className={[classes.signupButton, classes.button].join(" ")}
            onClick={router.openSignupModal}
            disableElevation
          >
            Sign up
          </RoundedButton>
        </div>
      </div>
    </div>
  );
};

export { BottomBanner };
