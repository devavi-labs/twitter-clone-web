import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { RegularUserFragment } from "../../generated/graphql";
import { useConditionalFollow } from "../../hooks/useConditionalFollow";
import { RoundedButton } from "../RoundedButton";

type FollowButtonProps = {
  user: RegularUserFragment | null;
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

  const [follow, fetching] = useConditionalFollow();

  if (user?.followStatus === null) {
    return <></>;
  }

  if (!user?.followStatus) {
    return (
      <RoundedButton
        variant="outlined"
        color="primary"
        onClick={() => follow(user)}
        disabled={fetching}
      >
        {fetching ? "Following" : "Follow"}
      </RoundedButton>
    );
  }

  if (user?.followStatus) {
    return (
      <RoundedButton
        variant="contained"
        className={classes.red}
        onClick={() => follow(user)}
        disabled={fetching}
      >
        {fetching ? "Unfollowing" : "Unfollow"}
      </RoundedButton>
    );
  }

  return <></>;
};

export { FollowButton };
