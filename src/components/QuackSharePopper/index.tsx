import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsLink45Deg } from "react-icons/bs";
import { Popper } from "..";
import {
  RegularQuackFragment,
  ShortQuackFragment,
} from "../../generated/graphql";
import { DOMAIN } from "../../utils/constants";

type QuackSharePopperProps = {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
  quack?: RegularQuackFragment | ShortQuackFragment | null | undefined;
  onCopy: (text: string) => Promise<void>;
};

const QuackSharePopper: React.FC<QuackSharePopperProps> = ({
  quack,
  onCopy,
  ...props
}) => {
  const useStyles = makeStyles(({ palette: { text } }) => ({
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
  const link = `${DOMAIN}/${quack?.quackedByUser?.username}/status/${quack?.id}`;
  return (
    <>
      <Popper {...props}>
        <List className={classes.body}>
          <ListItem component={Button} onClick={() => onCopy && onCopy(link)}>
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
