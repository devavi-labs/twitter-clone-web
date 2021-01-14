import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsDashCircleFill, BsLink45Deg } from "react-icons/bs";
import { Popper } from "..";
import { RegularUserFragment } from "../../generated/graphql";
import { useClipboard } from "../../hooks/useClipboard";
import { useConditionalBlock } from "../../hooks/useConditionalBlock";
import { REACT_APP_DOMAIN } from "../../utils/constants";

type ProfileOptionPopperProps = {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
  user?: RegularUserFragment | null | undefined;
};

const ProfileOptionPopper: React.FC<ProfileOptionPopperProps> = ({
  user,
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
  }));
  const classes = useStyles();

  const [block, blockLoading] = useConditionalBlock();

  const handleConditionalBlock = () => {
    props.onClose();
    block(user as RegularUserFragment);
  };

  const link = `${REACT_APP_DOMAIN}/${user?.username}`;

  const copy = useClipboard();

  const handleCopy = async () => {
    props.onClose();
    await copy(link);
  };

  return (
    <>
      <Popper {...props}>
        <List className={classes.body}>
          <ListItem component={Button} onClick={handleCopy}>
            <div className={classes.item}>
              <ListItemIcon>
                <BsLink45Deg className={classes.icon} />
              </ListItemIcon>
              <ListItemText className={classes.text}>
                Copy link to profile
              </ListItemText>
            </div>
          </ListItem>
          <ListItem component={Button} onClick={handleConditionalBlock}>
            <div className={classes.item}>
              <ListItemIcon>
                <BsDashCircleFill className={classes.icon} />
              </ListItemIcon>
              <ListItemText className={classes.text}>
                {user?.haveIBlockedThisUser
                  ? blockLoading
                    ? "Unblocking"
                    : "Unblock"
                  : blockLoading
                  ? "Blocking"
                  : "Block"}{" "}
                @{user?.username}
              </ListItemText>
            </div>
          </ListItem>
        </List>
      </Popper>
    </>
  );
};

export { ProfileOptionPopper };
