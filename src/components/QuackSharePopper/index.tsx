import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { Popper } from "..";
import {
  RegularQuackFragment,
  ShortQuackFragment,
} from "../../generated/graphql";
import { REACT_APP_DOMAIN } from "../../utils/constants";
import { useClipboard } from "../../hooks/useClipboard";
import { ToastContext } from "../../context/toast";

type QuackSharePopperProps = {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
  quack?: RegularQuackFragment | ShortQuackFragment | null | undefined;
};

const QuackSharePopper: React.FC<QuackSharePopperProps> = ({
  quack,
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

  const link = `${REACT_APP_DOMAIN}/${quack?.quackedByUser?.username}/status/${quack?.id}`;

  const copy = useClipboard();

  const { handleOpen } = useContext(ToastContext)!;

  const handleCopy = async () => {
    props.onClose();
    if (await copy(link)) {
      handleOpen("Link copied");
    } else {
      handleOpen("Couldn't copy link");
    }
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
