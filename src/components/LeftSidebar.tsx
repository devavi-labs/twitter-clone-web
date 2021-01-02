import { Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
import { AccountButton, RoundedButton, TabButton } from ".";
import { usePopper } from "../hooks/usePopper";
import { CreateQuackModal } from "./CreateQuackModal";
import { Logo } from "./Logo";
import { MoreMenuPopper } from "./MoreMenuPopper";

interface LeftSidebarProps {
  popup?: "display-settings" | "compose-quack";
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ popup }) => {
  const useStyles = makeStyles(({ palette: { secondary, type } }) => ({
    root: {
      flex: 2,
      backgroundColor: secondary.main,
      display: "flex",
      flexDirection: "column",
      paddingLeft: "4rem",
      alignItems: "flex-start",
    },
    top: {
      paddingRight: "2rem",
      width: "100%",
    },
    bottom: {
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      paddingRight: "0.5rem",
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
  }));

  const classes = useStyles();

  const history = useHistory();

  const { open, anchorEl, handleClick, onClose } = usePopper();

  const handleMClose = () => {
    history.push("/");
  };

  return (
    <>
      <Box component="aside" className={classes.root}>
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
            />
            <TabButton label="Explore" icon={BsHash} activeIcon={BsHash} />
            <TabButton
              label="Profile"
              icon={BsPerson}
              activeIcon={BsPersonFill}
            />
            <TabButton
              label="More"
              icon={BsThreeDots}
              activeIcon={BsThreeDots}
              onClick={handleClick}
            />
          </div>
          <RoundedButton
            color="primary"
            variant="contained"
            disableElevation
            fullWidth
            className={classes.quackButton}
            onClick={() =>
              history.push("/compose/quack", { popup: "compose-quack" })
            }
          >
            Quack
          </RoundedButton>
        </Box>
        <Box className={classes.bottom}>
          <AccountButton />
        </Box>
      </Box>
      <MoreMenuPopper
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        popup={
          popup !== "compose-quack" ? (popup as "display-settings") : undefined
        }
      />
      <CreateQuackModal
        open={popup === "compose-quack"}
        onClose={handleMClose}
      />
    </>
  );
};
