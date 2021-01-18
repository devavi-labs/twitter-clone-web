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
import React from "react";
import { BsDisplay, BsGear, BsPerson, BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Backdrop } from "..";
import { useMeQuery } from "../../generated/graphql";
import { useStyles } from "./styles";
import { useRouter } from "../../hooks/useRouter";

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
