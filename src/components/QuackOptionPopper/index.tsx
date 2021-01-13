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
  BsDashCircleFill,
  BsFillPersonDashFill,
  BsFillPersonPlusFill,
  BsTrashFill,
} from "react-icons/bs";
import { ConfirmDialog, Popper, TopProgressBar } from "..";
import {
  RegularQuackFragment,
  ShortQuackFragment,
  useDeleteQuackMutation,
  useMeQuery,
} from "../../generated/graphql";
import { useConfirmationDialog } from "../../hooks/useConfirmationDialog";
import { useDisclosure } from "../../hooks/useDisclosure";
import { Toast } from "../Toast";

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

  const {
    title,
    setTitle,
    content,
    setContent,
    open,

    handleOpen,
    onClose,
    confirmLabel,
    setConfirmLabel,
    confirmAction,
    setConfirmAction,
  } = useConfirmationDialog();

  const [loading, setLoading] = React.useState(false);

  const [, deleteQuack] = useDeleteQuackMutation();

  const handleDelete = async () => {
    setLoading(true);
    onClose();

    const { error, data } = await deleteQuack({ quackId: quack?.id! });

    if (data && data.deleteQuack) {
      setToastMessage("Quack deleted");
      setToastOpen(true);
    }

    if (error) {
      setToastMessage("Couldn't delete quack");
      setToastOpen(true);
    }

    setLoading(false);
  };

  const handleDeleteConfirmation = () => {
    setTitle("Delete Quack?");
    setContent(
      "This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Quacker search results. "
    );
    setConfirmLabel("Delete");
    setConfirmAction(() => handleDelete);
    props.onClose();
    handleOpen();
  };

  const {
    open: toastOpen,
    setOpen: setToastOpen,
    onClose: onToastClose,
  } = useDisclosure();
  const [toastMessage, setToastMessage] = React.useState("");

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
      <ConfirmDialog
        open={open}
        onClose={onClose}
        confirmLabel={confirmLabel}
        onConfirm={confirmAction}
        title={title}
        content={content}
      />
      <Toast open={toastOpen} message={toastMessage} onClose={onToastClose} />
    </>
  );
};

export { QuackOptionPopper };
