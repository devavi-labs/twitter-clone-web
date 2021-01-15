import { Box, Fab, IconButton, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import {
  BsHash,
  BsHouse,
  BsHouseFill,
  BsPerson,
  BsPersonFill,
  BsThreeDots,
} from "react-icons/bs";
import { IoCreate } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { AccountButton, RoundedButton, TabButton } from ".";
import { FeedContext } from "../context/feed";
import { useMeQuery } from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { usePopper } from "../hooks/usePopper";
import { Logo } from "./Logo";
import { MoreMenuPopper } from "./MoreMenuPopper";

export const LeftSidebar: React.FC = () => {
  const { md } = useMediaQuery();
  const useStyles = makeStyles(({ palette: { secondary, type, text } }) => ({
    root: {
      width: md ? 100 : "24%",
    },
    paper: {
      width: md ? 100 : "24%",
      backgroundColor: secondary.main,
      display: "flex",
      flexDirection: "column",
      paddingLeft: md ? "2rem" : "4rem",
      paddingRight: md ? "1rem" : 0,
      alignItems: "flex-start",
    },
    top: {
      paddingRight: md ? 0 : "2rem",
      width: "100%",
    },
    bottom: {
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight: md ? 0 : "0.5rem",
      paddingBottom: "1rem",
    },
    logo: {
      opacity: type === "dark" ? 0.8 : 1,
    },
    list: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "0.8rem",
      margin: "1rem 0",
    },
    quackButton: {
      paddingTop: "0.8rem !important",
      paddingBottom: "0.8rem !important",
    },
    createIcon: {
      fontSize: "1.5rem",
      color: "#ffffff",
    },
  }));

  const classes = useStyles();

  const [{ data }] = useMeQuery();

  const history = useHistory();

  const { open, anchorEl, handleClick: handleMoreClick, onClose } = usePopper();

  const { state } = useContext(FeedContext)!;

  const onCQClick = () =>
    history.push("/compose/quack", {
      popup: "compose-quack",
      feed: state?.feed,
      username: state?.username,
      tab: state?.tab,
    });

  return (
    <>
      <Drawer
        className={classes.root}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.paper }}
        disablePortal
      >
        <Box className={classes.top}>
          <IconButton onClick={() => history.push("/home")}>
            <Logo size="xxs" className={classes.logo} />
          </IconButton>
          <div className={classes.list}>
            <TabButton
              label="Home"
              icon={BsHouse}
              activeIcon={BsHouseFill}
              isActive
              onClick={() => history.push("/")}
            />
            <TabButton label="Explore" icon={BsHash} activeIcon={BsHash} />
            <TabButton
              label="Profile"
              icon={BsPerson}
              activeIcon={BsPersonFill}
              onClick={() => history.push(`/${data?.me?.username}`)}
            />
            <TabButton
              label="More"
              icon={BsThreeDots}
              activeIcon={BsThreeDots}
              onClick={handleMoreClick}
            />
          </div>
          {md ? (
            <Fab
              color="primary"
              aria-label="compose-quack"
              size="medium"
              onClick={onCQClick}
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
            >
              Quack
            </RoundedButton>
          )}
        </Box>
        <Box className={classes.bottom}>
          <AccountButton />
        </Box>
      </Drawer>
      <MoreMenuPopper open={open} anchorEl={anchorEl} onClose={onClose} />
    </>
  );
};
