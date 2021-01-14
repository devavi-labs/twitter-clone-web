import { Avatar, IconButton } from "@material-ui/core";
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
};

const Profile: React.FC<ProfileProps> = ({ user, loading }) => {
  const useStyles = makeStyles(({ palette: { primary, secondary } }) => ({
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
    stats: { display: "flex", gap: "0.5rem", margin: "0.4rem 0" },
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
              ) : user?.haveIBlockedThisUser ? (
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
          <DisplayName
            displayName={user?.displayName}
            username={user?.username}
            verified={user?.emailVerified}
            direction="vertical"
            size="lg"
            link={false}
          />
          <div className={classes.stats}>
            <Stat label="following" stat={user?.followings || 0} />
            <Stat label="followers" stat={user?.followers || 0} />
          </div>
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
