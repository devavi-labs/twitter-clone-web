import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  RegularUserFragment,
  ShortUserFragment,
} from "../../generated/graphql";
import { RoundedButton } from "../RoundedButton";

type FollowButtonProps = {
  user: RegularUserFragment | ShortUserFragment | null;
};

const FollowButton: React.FC<FollowButtonProps> = ({ user }) => {
  const useStyles = makeStyles(({ palette: { error } }) => ({
    red: {
      backgroundColor: error.main,
      "&:hover": {
        backgroundColor: error.dark,
      },
      "&:focus": {
        backgroundColor: error.dark,
      },
    },
  }));
  const classes = useStyles();

  if (user?.followStatus === null && user?.haveIBlockedThisUser === null) {
    return <></>;
  }

  if (!user?.followStatus) {
    return (
      <RoundedButton variant="outlined" color="primary">
        Follow
      </RoundedButton>
    );
  }

  if (user?.followStatus) {
    return (
      <RoundedButton variant="contained" className={classes.red}>
        Unfollow
      </RoundedButton>
    );
  }

  if (user?.haveIBlockedThisUser) {
    return (
      <RoundedButton variant="contained" className={classes.red}>
        Unblock
      </RoundedButton>
    );
  }

  return <></>;
};

export { FollowButton };
