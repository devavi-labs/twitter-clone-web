import { Link } from "@material-ui/core";
import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { Logo } from "../../components";
import { LoginForm } from "../../components/LoginForm";
import { useStyles } from "./styles";

const Login = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Logo className={classes.logo} />

        <h2 className={classes.heading}>Log in to Quacker</h2>

        <LoginForm />

        <div className={classes.extraLinks}>
          <Link component={RouteLink} to="/i/flow/login-dummy">
            Log in as Dummy User
          </Link>

          {" · "}

          <Link component={RouteLink} to="/i/flow/signup">
            Sign up for Quacker
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
