import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  BsFillPersonDashFill,
  BsFillPersonPlusFill,
  BsDashCircleFill,
  BsTrashFill,
} from "react-icons/bs";
import { Popper } from "..";
import {
  RegularQuackFragment,
  ShortQuackFragment,
  useMeQuery,
} from "../../generated/graphql";

type QuackOptionPopperProps = {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
  quack?: RegularQuackFragment | ShortQuackFragment | null | undefined;
};

const QuackOptionPopper: React.FC<QuackOptionPopperProps> = ({
  quack,
  ...props
}) => {
  const useStyles = makeStyles(({ palette: { text, error } }) => ({
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      minWidth: 200,
    },
    item: {
      display: "flex",
      alignItems: "center",
      padding: "0 !important",
    },
    icon: {
      color: text.primary,
      fontSize: "1rem",
    },
    text: {
      fontSize: "0.8rem",
      marginLeft: "-2rem",
      textTransform: "initial",
      color: text.primary,
    },
    red: {
      color: error.main,
    },
  }));
  const classes = useStyles();
  const [{ data }] = useMeQuery();
  return (
    <>
      <Popper {...props}>
        <List className={classes.body}>
          {data?.me?.id === quack?.quackedByUser?.id ? (
            <ListItem component={Button}>
              <div className={classes.item}>
                <ListItemIcon>
                  <BsTrashFill
                    className={[classes.icon, classes.red].join(" ")}
                  />
                </ListItemIcon>
                <ListItemText className={[classes.text, classes.red].join(" ")}>
                  Delete
                </ListItemText>
              </div>
            </ListItem>
          ) : (
            <>
              <ListItem component={Button}>
                <div className={classes.item}>
                  <ListItemIcon>
                    {quack?.quackedByUser?.followStatus ? (
                      <BsFillPersonDashFill className={classes.icon} />
                    ) : (
                      <BsFillPersonPlusFill className={classes.icon} />
                    )}
                  </ListItemIcon>
                  <ListItemText className={classes.text}>
                    {quack?.quackedByUser?.followStatus ? "Unfollow" : "Follow"}{" "}
                    @{quack?.quackedByUser?.username}
                  </ListItemText>
                </div>
              </ListItem>
              <ListItem component={Button}>
                <div className={classes.item}>
                  <ListItemIcon>
                    <BsDashCircleFill className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText className={classes.text}>
                    {quack?.quackedByUser?.haveIBlockedThisUser === true
                      ? "Unblock"
                      : "Block"}{" "}
                    @{quack?.quackedByUser?.username}
                  </ListItemText>
                </div>
              </ListItem>
            </>
          )}
        </List>
      </Popper>
    </>
  );
};

export { QuackOptionPopper };
