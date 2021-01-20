import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { Popper } from "..";
import { RegularQuackFragment } from "../../generated/graphql";
import { useClipboard } from "../../hooks";
import { REACT_APP_DOMAIN } from "../../utils/constants";
import { useStyles } from "./styles";

type QuackSharePopperProps = {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
  quack?: RegularQuackFragment | null | undefined;
};

const QuackSharePopper: React.FC<QuackSharePopperProps> = ({
  quack,
  ...props
}) => {
  const classes = useStyles();

  const link = `${REACT_APP_DOMAIN}/${quack?.quackedByUser?.username}/status/${quack?.id}`;

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
                Copy link to this quack
              </ListItemText>
            </div>
          </ListItem>
        </List>
      </Popper>
    </>
  );
};

export { QuackSharePopper };
