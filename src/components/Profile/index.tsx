import { Avatar, Chip, IconButton } from "@material-ui/core";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  BlockButton,
  DisplayName,
  FollowButton,
  ProfileOptionPopper,
  RoundedButton,
  Stat,
} from "..";
import { RegularUserFragment, useMeQuery } from "../../generated/graphql";
import { usePopper } from "../../hooks";
import { useStyles } from "./styles";

type ProfileProps = {
  user?: RegularUserFragment | null;
  loading?: boolean;
  fallbackUsername?: string;
};

const Profile: React.FC<ProfileProps> = ({
  user,
  loading,
  fallbackUsername,
}) => {
  const classes = useStyles({ coverPicture: user?.coverPicture });

  const [{ data }] = useMeQuery();

  const { open, onClose, anchorEl, handleClick } = usePopper();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.cover} />
        <div className={classes.profile}>
          <div className={classes.photoRow}>
            <Avatar
              src={user?.displayPicture}
              alt={user?.displayName}
              className={classes.avatar}
            />
            {user && (
              <div className={classes.actions}>
                {data?.me?.id === user?.id ? (
                  <RoundedButton variant="outlined" color="primary">
                    Edit Profile
                  </RoundedButton>
                ) : user?.haveIBlockedThisUser || user?.amIBlockedByThisUser ? (
                  <BlockButton user={user as RegularUserFragment | null} />
                ) : (
                  <>
                    <IconButton
                      className={classes.moreButton}
                      color="primary"
                      onClick={handleClick}
                    >
                      <BsThreeDots />
                    </IconButton>
                    <FollowButton user={user as RegularUserFragment | null} />
                  </>
                )}
              </div>
            )}
          </div>
          <div className={classes.labels}>
            <DisplayName
              displayName={user?.displayName || `@${fallbackUsername}`}
              username={user?.username}
              verified={user?.isVerified}
              direction="vertical"
              size="lg"
              link={false}
            />
            {user?.followBackStatus === true && (
              <Chip
                label="Follows you"
                className={classes.fbChip}
                size="small"
              />
            )}
          </div>
          {user && !user?.amIBlockedByThisUser && (
            <div className={classes.stats}>
              <Stat
                label="following"
                stat={user?.followings || 0}
                href={`/${user?.username}/followers`}
              />
              <Stat
                label="followers"
                stat={user?.followers || 0}
                href={`/${user?.username}/following`}
              />
            </div>
          )}
        </div>
      </div>
      <ProfileOptionPopper
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        user={user}
      />
    </>
  );
};

export { Profile };
