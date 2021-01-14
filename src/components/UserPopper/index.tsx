import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Popper, Stat, BlockButton, FollowButton, UserAvatar } from "..";
import { UserPopperContext } from "../../context/userPopper";

const UserPopper: React.FC = () => {
  const { open, onClose, anchorEl, user } = React.useContext(
    UserPopperContext
  )!;

  const useStyles = makeStyles(
    ({ palette: { primary, text, type, error } }) => ({
      root: {
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      },
      header: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.2rem",
      },
      followBtn: {
        backgroundColor: user?.followStatus ? error.main : primary.main,
        "&:hover": {
          backgroundColor: user?.followStatus ? error.dark : primary.dark,
        },
        "&:focus": {
          backgroundColor: user?.followStatus ? error.dark : primary.dark,
        },
      },
      profile: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      },
      avatar: { marginRight: "0.4em", height: "3.5rem", width: "3.5rem" },
      displayName: {
        color: text.primary,
        fontWeight: "bold",
        opacity: type === "dark" ? 0.8 : 1,
      },
      username: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "0.4rem",
      },
      handle: {
        color: text.primary,
        opacity: 0.6,
        fontSize: "0.8rem",
      },
      fbChip: {
        fontSize: "0.7rem",
      },
      stats: {
        display: "flex",
        gap: "0.5rem",
        margin: "0.4rem 0",
      },
    })
  );
  const classes = useStyles();

  return (
    <div onMouseLeave={onClose}>
      <Popper open={open} onClose={onClose} anchorEl={anchorEl}>
        <div className={classes.root}>
          <div className={classes.header}>
            <UserAvatar user={user} />
            {user?.haveIBlockedThisUser ? (
              <BlockButton user={user} />
            ) : (
              <FollowButton user={user} />
            )}
          </div>
          <div className={classes.profile}>
            <span className={classes.displayName}>{user?.displayName}</span>
            <div className={classes.username}>
              <span className={classes.handle}>@{user?.username}</span>
              {user?.followBackStatus === true && (
                <Chip
                  label="Follows you"
                  className={classes.fbChip}
                  size="small"
                />
              )}
            </div>
            <div className={classes.stats}>
              <Stat label="following" stat={user?.followings || 0} />
              <Stat label="followers" stat={user?.followers || 0} />
            </div>
          </div>
        </div>
      </Popper>
    </div>
  );
};

export { UserPopper };
