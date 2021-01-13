import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsCheck } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Popper } from ".";
import { useMeQuery } from "../generated/graphql";

interface AccountPopperProps {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
}

export const AccountPopper: React.FC<AccountPopperProps> = ({
  open = false,
  onClose,
  anchorEl,
}) => {
  const [{ data }] = useMeQuery();

  const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
    body: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
    },
    profile: { display: "flex", alignItems: "center" },
    avatar: { marginRight: "0.4em", height: "3.5rem", width: "3.5rem" },
    displayName: {
      color: text.primary,
      fontWeight: "bold",
      opacity: type === "dark" ? 0.8 : 1,
    },
    handle: {
      color: text.primary,
      opacity: 0.6,
      fontSize: "0.9rem",
    },
    check: {
      color: primary.main,
      fontSize: "1.5rem",
      opacity: type === "dark" ? 0.8 : 1,
    },
    logoutText: {
      textTransform: "initial",
      opacity: type === "dark" ? 0.7 : 1,
      color: text.primary,
    },
  }));
  const classes = useStyles();

  const history = useHistory();

  return (
    <Popper open={open} onClose={onClose} anchorEl={anchorEl} minWidth="300px">
      <List>
        <ListItem className={classes.body}>
          <div className={classes.profile}>
            <Avatar className={classes.avatar} src={data?.me?.displayPicture} />
            <div>
              <Typography className={classes.displayName}>
                {data?.me?.displayName}
              </Typography>
              <Typography className={classes.handle}>
                @{data?.me?.username}
              </Typography>
            </div>
          </div>
          <BsCheck className={classes.check} />
        </ListItem>
        <Divider />
        <ListItem
          component={Button}
          className={classes.body}
          onClick={() => history.push("/logout")}
        >
          <Typography className={classes.logoutText}>
            Log out @{data?.me?.username}
          </Typography>
        </ListItem>
      </List>
    </Popper>
  );
};
