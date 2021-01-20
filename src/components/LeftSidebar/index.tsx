import { Box, Drawer, IconButton } from "@material-ui/core";
import React from "react";
import {
  BsHash,
  BsHouse,
  BsHouseFill,
  BsPerson,
  BsPersonFill,
  BsThreeDots,
} from "react-icons/bs";
import { useHistory } from "react-router-dom";
import {
  AccountButton,
  Logo,
  MoreMenuPopper,
  QuackButton,
  TabButton,
} from "..";
import { useMeQuery } from "../../generated/graphql";
import { useMediaQuery, usePopper } from "../../hooks";
import { useStyles } from "./styles";

export const LeftSidebar: React.FC = () => {
  const { md } = useMediaQuery();

  const classes = useStyles();

  const [{ data }] = useMeQuery();

  const history = useHistory();

  const { open, anchorEl, handleClick: handleMoreClick, onClose } = usePopper();

  return (
    <>
      <Drawer
        className={classes.root}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.paper }}
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
          <QuackButton variant={md ? "fab" : "button"} />
        </Box>
        <Box className={classes.bottom}>
          <AccountButton />
        </Box>
      </Drawer>
      <MoreMenuPopper open={open} anchorEl={anchorEl} onClose={onClose} />
    </>
  );
};
