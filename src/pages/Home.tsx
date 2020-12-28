import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BsChat, BsPeople, BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { LoginButton, Logo, SignupButton, SignupModal } from "../components";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Home = () => {
  const { sm, xs } = useMediaQuery();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const [signupModalOpen, setSignupModalOpen] = useState(
    pathname === "/signup"
  );

  useEffect(() => {
    pathname === "/signup" && !signupModalOpen && setSignupModalOpen(true);
    pathname === "/" && signupModalOpen && setSignupModalOpen(false);
  }, [pathname, signupModalOpen]);

  const closeSignupModal = () => {
    setSignupModalOpen(false);
    history.replace("/");
  };

  const { palette } = useTheme();

  const useStyles = makeStyles({
    leftBox: {
      flex: 1,
      backgroundColor: palette.primary.light,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('logo-blue512.png')",
      backgroundSize: xs ? "100%" : sm ? "contain" : "140%",
      backgroundPosition: "right",
      backgroundRepeat: "no-repeat",
      paddingTop: sm ? "1rem" : "",
      paddingBottom: sm ? "1rem" : "",
      padding: "0 1em",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      gridRowGap: "1rem",
    },
    listItemText: {
      color: "white",
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginLeft: "-1rem",
    },
    rightBox: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: sm ? "1rem" : "",
      paddingBottom: sm ? "1rem" : "",
      padding: "0 1em",
    },
    rightBoxInner: {
      maxWidth: "400px",
    },
    logo: {
      opacity: palette.type === "dark" ? 0.8 : 1,
    },
    paragraph: {
      fontSize: "1.9rem",
      fontWeight: "bold",
      marginTop: "1rem",
      marginBottom: "4rem",
      opacity: palette.type === "dark" ? 0.8 : 1,
    },
    callText: {
      fontSize: "0.9rem",
      fontWeight: "bold",
      marginBottom: "0.5em",
      opacity: palette.type === "dark" ? 0.8 : 1,
    },

    bottomBox: {
      flex: 1,
    },
    bottomBoxInner: {
      display: "flex",
      maxWidth: "400px",
      margin: "2rem auto",
      gridColumnGap: "1rem",
      padding: "0 1em",
    },
    footer: {
      backgroundColor: palette.secondary.main,
      padding: "1rem",
    },
    copyrightText: {
      fontSize: "0.8rem",
      textAlign: "center",
      opacity: palette.type === "dark" ? 0.6 : 1,
    },
  });

  const classes = useStyles();

  return (
    <Box component="main">
      <Box
        flex={1}
        display="flex"
        flexDirection={sm ? "column-reverse" : "row"}
        bgcolor="secondary.main"
      >
        {sm && (
          <Box className={classes.bottomBox}>
            <Box className={classes.bottomBoxInner}>
              <SignupButton onClick={() => history.push("/signup")} />
              <LoginButton onClick={() => history.push("/login")} />
            </Box>
          </Box>
        )}
        <Box className={classes.leftBox}>
          <List className={classes.list}>
            <ListItem dense>
              <ListItemIcon>
                <BsSearch size="1.6rem" color="white" />
              </ListItemIcon>
              <ListItemText>
                <Typography className={classes.listItemText}>
                  Follow your interests.
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <BsPeople size="1.6rem" color="white" />
              </ListItemIcon>
              <ListItemText>
                <Typography className={classes.listItemText}>
                  Hear what people are talking about.
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <BsChat size="1.6rem" color="white" />
              </ListItemIcon>
              <ListItemText>
                <Typography className={classes.listItemText}>
                  Join the conversation.
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
        <Box className={classes.rightBox}>
          <Box className={classes.rightBoxInner}>
            <Box>
              <Box className={classes.logo}>
                <Logo variant={palette.type === "dark" ? "white" : "blue"} />
              </Box>
              <Typography paragraph className={classes.paragraph}>
                See what’s happening in the world right now
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="stretch">
              <Typography className={classes.callText}>
                Join Quacker today.
              </Typography>
              <SignupButton onClick={() => history.push("/signup")} />
              <LoginButton onClick={() => history.push("/login")} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.footer}>
        <Typography className={classes.copyrightText}>
          © {new Date().getFullYear().toString()} Quacker
        </Typography>
      </Box>
      <SignupModal open={signupModalOpen} onClose={closeSignupModal} />
    </Box>
  );
};

export default Home;
