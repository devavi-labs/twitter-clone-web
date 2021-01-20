import React from "react";
import { RegularUserFragment } from "../../generated/graphql";
import { useConditionalBlock } from "../../hooks";
import { RoundedButton } from "../RoundedButton";
import { useStyles } from "./styles";

type BlockButtonProps = {
  user: RegularUserFragment | null;
};

const BlockButton: React.FC<BlockButtonProps> = ({ user }) => {
  const classes = useStyles();

  const [block, fetching] = useConditionalBlock();

  if (user?.haveIBlockedThisUser === null) {
    return <></>;
  }

  if (!user?.haveIBlockedThisUser) {
    return (
      <RoundedButton
        variant="outlined"
        color="primary"
        onClick={() => block(user)}
        disabled={fetching}
      >
        {fetching ? "Blocking" : "Block"}
      </RoundedButton>
    );
  }

  if (user?.haveIBlockedThisUser) {
    return (
      <RoundedButton
        variant="contained"
        className={classes.red}
        onClick={() => block(user)}
        disabled={fetching}
      >
        {fetching ? "Unblocking" : "Unblock"}
      </RoundedButton>
    );
  }

  return <></>;
};

export { BlockButton };
