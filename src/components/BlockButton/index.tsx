import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { RegularUserFragment } from "../../generated/graphql";
import { useConditionalBlock } from "../../hooks/useConditionalBlock";
import { RoundedButton } from "../RoundedButton";

type BlockButtonProps = {
  user: RegularUserFragment | null;
};

const BlockButton: React.FC<BlockButtonProps> = ({ user }) => {
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

  const [block] = useConditionalBlock();

  if (user?.haveIBlockedThisUser === null) {
    return <></>;
  }

  if (!user?.haveIBlockedThisUser) {
    return (
      <RoundedButton
        variant="outlined"
        color="primary"
        onClick={() => block(user)}
      >
        Block
      </RoundedButton>
    );
  }

  if (user?.haveIBlockedThisUser) {
    return (
      <RoundedButton
        variant="contained"
        className={classes.red}
        onClick={() => block(user)}
      >
        Unblock
      </RoundedButton>
    );
  }

  return <></>;
};

export { BlockButton };
