import { Chip } from "@material-ui/core";
import React from "react";
import { BlockButton, FollowButton, Popper, Stat, UserAvatar } from "..";
import { useUserPopper } from "../../hooks";
import { useStyles } from "./styles";

const UserPopper: React.FC = () => {
  const [{ user, open, onClose, anchorEl }] = useUserPopper();

  const classes = useStyles({
    followStatus: user?.followStatus || false,
  });

  return (
    <div onMouseLeave={() => (onClose ? onClose() : () => {})}>
      <Popper
        open={open}
        onClose={() => (onClose ? onClose() : () => {})}
        anchorEl={anchorEl || null}
      >
        <div className={classes.root}>
          <div className={classes.header}>
            <UserAvatar user={user} />
            {user?.haveIBlockedThisUser ? (
              <BlockButton user={user} />
            ) : (
              <FollowButton user={user || null} />
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
