import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { BsChat, BsPeople, BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Footer, LoginButton, Logo, SignupButton } from "../../components";
import { useRouter } from "../../hooks/useRouter";
import { RouteStateType } from "../../routes";
import { useStyles } from "./styles";

const Home: React.FC = () => {
  const router = useRouter(useHistory<RouteStateType>());

  const classes = useStyles();

  return (
    <main>
      <div className={classes.root}>
        <div className={classes.bottomBox}>
          <div className={classes.bottomBoxInner}>
            <SignupButton onClick={() => router.openSignupModal()} />
            <LoginButton onClick={() => router.pushLoginPage()} />
          </div>
        </div>
        <div className={classes.leftBox}>
          <List className={classes.list}>
            <ListItem dense>
              <ListItemIcon>
                <BsSearch size="1.6rem" color="white" />
              </ListItemIcon>
              <ListItemText>
                <span className={classes.listItemText}>
                  Follow your interests.
                </span>
              </ListItemText>
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <BsPeople size="1.6rem" color="white" />
              </ListItemIcon>
              <ListItemText>
                <span className={classes.listItemText}>
                  Hear what people are talking about.
                </span>
              </ListItemText>
            </ListItem>
            <ListItem dense>
              <ListItemIcon>
                <BsChat size="1.6rem" color="white" />
              </ListItemIcon>
              <ListItemText>
                <span className={classes.listItemText}>
                  Join the conversation.
                </span>
              </ListItemText>
            </ListItem>
          </List>
        </div>
        <div className={classes.rightBox}>
          <div className={classes.rightBoxInner}>
            <div>
              <div className={classes.logo}>
                <Logo />
              </div>
              <p className={classes.paragraph}>
                See what’s happening in the world right now
              </p>
            </div>
            <div className={classes.buttons}>
              <span className={classes.callText}>Join Quacker today.</span>
              <SignupButton onClick={() => router.openSignupModal()} />
              <LoginButton onClick={() => router.pushLoginPage()} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
