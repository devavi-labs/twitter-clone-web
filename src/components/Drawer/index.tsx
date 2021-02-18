import {
  Avatar,
  Button,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import { BsDisplay, BsHouse, BsHash, BsPerson, BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Backdrop, Stat, DisplayName } from "..";
import { useMeQuery } from "../../generated/graphql";
import { useRouter } from "../../hooks";
import { useStyles } from "./styles";

interface DrawerProps {
  open: boolean;
  onClose: () => any;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const [{ data }] = useMeQuery();
  const history = useHistory();
  const router = useRouter(history);

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
          <DisplayName
            displayName={data?.me?.displayName}
            username={data?.me?.username}
            direction="vertical"
            link={false}
          />
          <div className={classes.follow}>
            <div onClick={onClose}>
              <Stat
                label="following"
                stat={data?.me?.followings || 0}
                href={`/${data?.me?.username}/followers`}
              />
            </div>
            <div onClick={onClose}>
              <Stat
                label="followers"
                stat={data?.me?.followers || 0}
                href={`/${data?.me?.username}/following`}
              />
            </div>
          </div>
        </div>
        <List>
          <ListItem
            component={Button}
            onClick={() => {
              onClose();
              history.push("/home");
            }}
          >
            <ListItemIcon className={classes.listIcon}>
              <BsHouse />
            </ListItemIcon>
            <ListItemText className={classes.listText}>Home</ListItemText>
          </ListItem>
          <ListItem
            component={Button}
            onClick={() => {
              onClose();
              history.push("/explore");
            }}
          >
            <ListItemIcon className={classes.listIcon}>
              <BsHash />
            </ListItemIcon>
            <ListItemText className={classes.listText}>Explore</ListItemText>
          </ListItem>
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

          <ListItem
            component={Button}
            onClick={() => {
              onClose();
              router.openDisplaySettingsModal();
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
