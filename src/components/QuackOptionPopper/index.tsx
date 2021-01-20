import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import {
  BsDashCircleFill,
  BsFillPersonDashFill,
  BsFillPersonPlusFill,
  BsTrashFill,
} from "react-icons/bs";
import { Popper, TopProgressBar } from "..";
import {
  RegularQuackFragment,
  RegularUserFragment,
  useDeleteQuackMutation,
  useMeQuery,
} from "../../generated/graphql";
import {
  useConditionalBlock,
  useConditionalFollow,
  useConfirmDialog,
  useToast,
} from "../../hooks";
import { useStyles } from "./styles";

type QuackOptionPopperProps = {
  open?: boolean;
  onClose: () => any;
  anchorEl: null | HTMLElement;
  quack?: RegularQuackFragment | null | undefined;
};

const QuackOptionPopper: React.FC<QuackOptionPopperProps> = ({
  quack,
  ...props
}) => {
  const classes = useStyles();
  const [{ data }] = useMeQuery();

  const [, { handleOpen: handleToastOpen }] = useToast();
  const [, { handleOpen: handleDialogOpen }] = useConfirmDialog();

  const [loading, setLoading] = React.useState(false);

  const [, deleteQuack] = useDeleteQuackMutation();

  const handleDelete = async () => {
    setLoading(true);
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

  const [follow, followLoading] = useConditionalFollow();

  const handleConditionalFollow = () => {
    props.onClose();
    follow(quack?.quackedByUser as RegularUserFragment);
  };

  const [block, blockLoading] = useConditionalBlock();

  const handleConditionalBlock = () => {
    props.onClose();
    block(quack?.quackedByUser as RegularUserFragment);
  };

  return (
    <React.Fragment>
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
              <ListItem
                component={Button}
                onClick={handleConditionalFollow}
                disabled={followLoading}
              >
                <div className={classes.item}>
                  <ListItemIcon>
                    {quack?.quackedByUser?.followStatus ? (
                      <BsFillPersonDashFill className={classes.icon} />
                    ) : (
                      <BsFillPersonPlusFill className={classes.icon} />
                    )}
                  </ListItemIcon>
                  <ListItemText className={classes.text}>
                    {quack?.quackedByUser?.followStatus
                      ? followLoading
                        ? "Unfollowing"
                        : "Unfollow"
                      : followLoading
                      ? "Following"
                      : "Follow"}{" "}
                    @{quack?.quackedByUser?.username}
                  </ListItemText>
                </div>
              </ListItem>
              <ListItem component={Button} onClick={handleConditionalBlock}>
                <div className={classes.item}>
                  <ListItemIcon>
                    <BsDashCircleFill className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText className={classes.text}>
                    {quack?.quackedByUser?.haveIBlockedThisUser
                      ? blockLoading
                        ? "Unblocking"
                        : "Unblock"
                      : blockLoading
                      ? "Blocking"
                      : "Block"}{" "}
                    @{quack?.quackedByUser?.username}
                  </ListItemText>
                </div>
              </ListItem>
            </>
          )}
        </List>
      </Popper>
    </React.Fragment>
  );
};

export { QuackOptionPopper };
