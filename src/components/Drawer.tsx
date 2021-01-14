import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsDisplay, BsGear, BsPerson, BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Backdrop } from ".";
import { useMeQuery } from "../generated/graphql";

interface DrawerProps {
  open: boolean;
  onOpen: () => any;
  onClose: () => any;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onOpen, onClose }) => {
  const useStyles = makeStyles(
    ({
      palette: {
        primary,
        background: { paper },
      },
    }) => ({
      root: {
        minWidth: "70vw",
        minHeight: "100%",
        background: paper,
      },
      header: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 0.8rem",
      },
      heading: {
        fontSize: "1.1rem",
        fontWeight: "bold",
      },
      closeIcon: {
        color: primary.main,
      },
      profile: {
        padding: "0.5rem 0.8rem",
      },
      avatar: {
        height: 36,
        width: 36,
      },
      displayName: {
        fontWeight: "bold",
        marginTop: "0.4rem",
      },
      username: {
        opactiy: 0.6,
      },
      follow: {
        display: "flex",
        gap: "1rem",
        marginTop: "1rem",
      },
      followText: {
        display: "flex",
        gap: "0.2rem",
        fontSize: "0.9rem",
      },
      followStat: {
        fontSize: "0.9rem",
        fontWeight: "bold",
      },
      listIcon: {
        fontSize: "1rem",
      },
      listText: {
        marginLeft: "-2rem",
        textTransform: "capitalize",
        fontSize: "0.9rem",
      },
      logoutText: {
        textTransform: "capitalize",
        fontSize: "0.9rem",
      },
    })
  );
  const classes = useStyles();
  const [{ data }] = useMeQuery();
  const history = useHistory();
  return (
    <MuiDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
    >
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography className={classes.heading}>Account info</Typography>
          <IconButton onClick={onClose}>
            <BsX className={classes.closeIcon} />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.profile}>
          <Avatar
            src={data?.me?.displayPicture}
            alt={data?.me?.displayName}
            className={classes.avatar}
          />
          <Typography className={classes.displayName}>
            {data?.me?.displayName}
          </Typography>
          <Typography className={classes.username}>
            @{data?.me?.username}
          </Typography>
          <div className={classes.follow}>
            <Typography className={classes.followText}>
              <Typography className={classes.followStat}>
                {data?.me?.followings}
              </Typography>
              Following
            </Typography>
            <Typography className={classes.followText}>
              <Typography className={classes.followStat}>
                {data?.me?.followers}
              </Typography>
              Followers
            </Typography>
          </div>
        </div>
        <List>
          <ListItem
            component={Button}
            onClick={() => {
              onClose();
              history.push(`/${data?.me?.username}`);
            }}
          >
            <ListItemIcon className={classes.listIcon}>
              <BsPerson />
            </ListItemIcon>
            <ListItemText className={classes.listText}>Profile</ListItemText>
          </ListItem>
          <ListItem component={Button}>
            <ListItemIcon className={classes.listIcon}>
              <BsGear />
            </ListItemIcon>
            <ListItemText className={classes.listText}>Settings</ListItemText>
          </ListItem>
          <ListItem
            component={Button}
            onClick={() => {
              onClose();
              history.push("/i/display");
            }}
          >
            <ListItemIcon className={classes.listIcon}>
              <BsDisplay />
            </ListItemIcon>
            <ListItemText className={classes.listText}>Display</ListItemText>
          </ListItem>
          <Divider />
          <ListItem component={Button} onClick={() => history.push("/logout")}>
            <ListItemText className={classes.logoutText}>Logout</ListItemText>
          </ListItem>
        </List>
      </div>
    </MuiDrawer>
  );
};
