import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { BsDashCircleFill, BsLink45Deg } from "react-icons/bs";
import { Popper } from "..";
import { RegularUserFragment } from "../../generated/graphql";
import { useClipboard, useConditionalBlock } from "../../hooks";
import { REACT_APP_DOMAIN } from "../../utils/constants";
import { useStyles } from "./styles";

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
