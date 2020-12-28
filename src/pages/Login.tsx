import { Box, Typography, makeStyles, Link } from "@material-ui/core";
import React from "react";
import { Logo } from "../components";
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  const useStyles = makeStyles(({ palette }) => ({
    root: {
      backgroundColor: palette.secondary.main,
      padding: "1rem",
    },
    container: {
      flex: 1,
      maxWidth: "600px",
      margin: "0 auto",
    },
    heading: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      textAlign: "center",
      margin: "1rem 0",
      opacity: palette.type === "dark" ? 0.8 : 1,
    },
    logo: {
      margin: "0 auto",
      opacity: palette.type === "dark" ? 0.8 : 1,
    },
    extraLinks: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1.2rem 0",
      gridColumnGap: "0.4rem",
    },
  }));
  const classes = useStyles();

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.container}>
        <Logo className={classes.logo} />
        <Typography variant="h2" component="h2" className={classes.heading}>
          Log in to Quacker
        </Typography>

        <LoginForm />

        <div className={classes.extraLinks}>
          <Link>Forgot password?</Link> ·{" "}
          <Link href="/signup">Sign up for Twitter</Link>
        </div>
      </Box>
    </Box>
  );
};

export default Login;
