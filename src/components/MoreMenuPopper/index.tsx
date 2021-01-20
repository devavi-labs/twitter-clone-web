import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { BsDisplay, BsGear } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Popper } from "..";
import { useRouter } from "../../hooks";
import { useStyles } from "./styles";

interface MoreMenuPopperProps {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
}

export const MoreMenuPopper: React.FC<MoreMenuPopperProps> = ({ ...props }) => {
  const classes = useStyles();

  const history = useHistory();
  const router = useRouter(history);

  return (
    <Popper {...props}>
      <List className={classes.body}>
        <ListItem component={Button}>
          <div className={classes.item}>
            <ListItemIcon>
              <BsGear className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text}>Settings</ListItemText>
          </div>
        </ListItem>
        <ListItem
          component={Button}
          onClick={() => {
            props.onClose();
            router.openDisplaySettingsModal();
          }}
        >
          <div className={classes.item}>
            <ListItemIcon>
              <BsDisplay className={classes.icon} />
            </ListItemIcon>
            <ListItemText className={classes.text}>Display</ListItemText>
          </div>
        </ListItem>
      </List>
    </Popper>
  );
};
