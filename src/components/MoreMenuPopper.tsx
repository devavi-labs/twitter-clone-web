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
import { useHistory } from "react-router-dom";
import { DisplaySettingsModal, Popper } from ".";

interface MoreMenuPopperProps {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
  popup?: "display-settings";
}

export const MoreMenuPopper: React.FC<MoreMenuPopperProps> = ({
  popup,
  ...props
}) => {
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

  const history = useHistory();

  const handleDSBtnClick = () => {
    props.onClose();
    history.push("/i/display");
  };

  const handleClose = () => {
    history.push("/home");
    history.go(0);
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
      <DisplaySettingsModal
        open={popup === "display-settings"}
        onClose={handleClose}
      />
    </>
  );
};
