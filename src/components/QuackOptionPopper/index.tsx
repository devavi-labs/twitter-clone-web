import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import {
  BsDashCircleFill,
  BsFillPersonDashFill,
  BsFillPersonPlusFill,
  BsTrashFill,
} from "react-icons/bs";
import { Popper, TopProgressBar } from "..";
import { ConfirmDialogContext } from "../../context/confimDialog";
import { ToastContext } from "../../context/toast";
import {
  RegularQuackFragment,
  ShortQuackFragment,
  useDeleteQuackMutation,
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

  const { handleOpen: handleToastOpen } = useContext(ToastContext)!;
  const { handleOpen: handleDialogOpen, onClose } = useContext(
    ConfirmDialogContext
  )!;

  const [loading, setLoading] = React.useState(false);

  const [, deleteQuack] = useDeleteQuackMutation();

  const handleDelete = async () => {
    setLoading(true);
    onClose && onClose();

    const { error, data } = await deleteQuack({ quackId: quack?.id! });

    if (data && data.deleteQuack) {
      handleToastOpen("Quack deleted");
    }

    if (error) {
      handleToastOpen("Couldn't delete quack");
    }

    setLoading(false);
  };

  const handleDeleteConfirmation = () => {
    props.onClose();
    handleDialogOpen({
      title: "Delete Quack?",
      content: `This can’t be undone and it will be removed from your profile, 
      the timeline of any accounts that follow you,
      and from Quacker search results.`,
      confirmLabel: "Delete",
      onConfirm: handleDelete,
    });
  };

  return (
    <>
      {loading && <TopProgressBar />}
      <Popper {...props}>
        <List className={classes.body}>
          {data?.me?.id === quack?.quackedByUser?.id ? (
            <ListItem component={Button} onClick={handleDeleteConfirmation}>
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
