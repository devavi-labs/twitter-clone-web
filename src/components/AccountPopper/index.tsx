import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import React from "react";
import { BsCheck } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { DisplayName, Popper } from "..";
import { useMeQuery } from "../../generated/graphql";
import { useStyles } from "./styles";

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

  const classes = useStyles();

  const history = useHistory();

  return (
    <Popper open={open} onClose={onClose} anchorEl={anchorEl} minWidth="300px">
      <List>
        <ListItem className={classes.body}>
          <div className={classes.profile}>
            <Avatar className={classes.avatar} src={data?.me?.displayPicture} />
            <DisplayName
              displayName={data?.me?.displayName}
              username={data?.me?.username}
              verified={data?.me?.emailVerified}
              direction="vertical"
            />
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
