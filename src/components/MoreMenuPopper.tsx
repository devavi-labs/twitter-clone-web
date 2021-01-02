import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsDisplay, BsGear } from "react-icons/bs";
import { Popper } from ".";
import { useModal } from "../hooks/useModal";
import { DisplaySettingsModal } from ".";
import { useHistory } from "react-router-dom";

interface MoreMenuPopperProps {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
}

export const MoreMenuPopper: React.FC<MoreMenuPopperProps> = (props) => {
  const useStyles = makeStyles(
    ({ palette: { secondary, primary, text, type } }) => ({
      body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      },
      item: {
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 0 !important",
      },
      icon: {
        color: text.primary,
      },
      text: {
        marginLeft: "-2rem",
        textTransform: "initial",
        color: text.primary,
      },
    })
  );
  const classes = useStyles();

  const { open, toggle, onClose } = useModal();

  const handleDSBtnClick = () => {
    props.onClose();
    toggle();
  };

  const history = useHistory();
  const handleClose = () => {
    history.go(0);
    onClose();
  };

  return (
    <>
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
          <ListItem component={Button} onClick={handleDSBtnClick}>
            <div className={classes.item}>
              <ListItemIcon>
                <BsDisplay className={classes.icon} />
              </ListItemIcon>
              <ListItemText className={classes.text}>Display</ListItemText>
            </div>
          </ListItem>
        </List>
      </Popper>
      <DisplaySettingsModal open={open} onClose={handleClose} />
    </>
  );
};
