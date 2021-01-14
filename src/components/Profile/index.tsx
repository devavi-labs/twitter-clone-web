import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { DisplayName, RoundedButton, Stat } from "..";
import { RegularUserFragment, useMeQuery } from "../../generated/graphql";
import { usePopper } from "../../hooks/usePopper";
import { hexToRgb } from "../../utils/hexToRgb";
import { BlockButton } from "../BlockButton";
import { FollowButton } from "../FollowButton";
import { ProfileOptionPopper } from "../ProfileOptionPopper";

type ProfileProps = {
  user?: RegularUserFragment | null;
  loading?: boolean;
  viewQuacks?: boolean;
  onViewQuacks?: () => void;
};

const Profile: React.FC<ProfileProps> = ({
  user,
  loading,
  viewQuacks,
  onViewQuacks,
}) => {
  const useStyles = makeStyles(({ palette: { primary, secondary, text } }) => ({
    root: {
      width: "100%",
    },
    cover: {
      width: "100%",
      height: 0,
      paddingTop: "33%",
      backgroundColor: "#b6b2b2",
      backgroundImage: `url(${user?.coverPicture})`,
      backgroundSize: "100%",
      backgroundPosition: "center",
    },
    profile: {
      padding: "0 1rem",
    },
    photoRow: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
    avatar: {
      marginTop: "clamp(-75px, -5vw, -20px)",
      width: "clamp(85px, 10vw, 150px)",
      height: "clamp(85px, 10vw, 150px)",
      backgroundColor: "#b6b2b2",
      border: "4px solid",
      borderColor: secondary.main,
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    moreButton: {
      border: "0.4px solid",
      borderColor: hexToRgb(primary.main, 0.5),
      padding: "0.5rem !important",
      "&:hover": {
        borderColor: primary.main,
      },
      "&:focus": {
        borderColor: primary.main,
      },
    },
    labels: {
      display: "flex",
      alignItems: "flex-end",
      gap: "0.4rem",
      margin: "1rem 0",
    },
    fbChip: {
      fontSize: "0.7rem",
    },
    stats: {
      display: "flex",
      gap: "0.5rem",
      marginBottom: "1rem",
    },
    blockedMessageContainer: {
      margin: "1rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.6rem",
      textAlign: "center",
      padding: "0 1rem",
    },
    blockedHeading: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    blockedContent: {
      fontSize: "0.9rem",
      color: text.secondary,
    },
  }));
  const classes = useStyles();

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
          </div>
          <div className={classes.labels}>
            <DisplayName
              displayName={user?.displayName}
              username={user?.username}
              verified={user?.emailVerified}
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
          {!user?.amIBlockedByThisUser && (
            <div className={classes.stats}>
              <Stat label="following" stat={user?.followings || 0} />
              <Stat label="followers" stat={user?.followers || 0} />
            </div>
          )}
        </div>
        {(user?.amIBlockedByThisUser || user?.haveIBlockedThisUser) &&
          !viewQuacks && (
            <>
              <Divider />
              <div className={classes.blockedMessageContainer}>
                {user?.haveIBlockedThisUser && (
                  <Typography component="h2" className={classes.blockedHeading}>
                    @{user?.username} is blocked
                  </Typography>
                )}
                {user?.amIBlockedByThisUser ? (
                  <Typography className={classes.blockedContent}>
                    You are blocked from following @{user?.username} and viewing
                    @{user?.username}'s Quacks.
                  </Typography>
                ) : (
                  <>
                    <Typography className={classes.blockedContent}>
                      Are you sure you want to view these Quacks? Viewing Quacks
                      won’t unblock @{user?.username}.
                    </Typography>
                    <RoundedButton
                      variant="outlined"
                      color="primary"
                      onClick={onViewQuacks}
                    >
                      View Quacks
                    </RoundedButton>
                  </>
                )}
              </div>
            </>
          )}
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
