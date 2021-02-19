import React from "react";
import { DisplayName, QuackOptionButton, ShortDateTime, UserAvatar } from "..";
import { RegularQuackFragment } from "../../generated/graphql";
import { useStyles } from "./styles";

export type QuackHeaderProps = {
  quack: RegularQuackFragment;
  variant?: "contained" | "open" | "reply" | "replying-to";
};

const QuackHeader: React.FC<QuackHeaderProps> = ({ quack, variant }) => {
  const classes = useStyles({ variant });

  return (
    <div className={classes.root}>
      <div className={classes.texts}>
        {variant === "open" && (
          <UserAvatar user={quack?.quackedByUser} variant={variant} />
        )}
        <DisplayName
          displayName={quack?.quackedByUser?.displayName}
          username={quack?.quackedByUser?.username}
          link
          direction={variant === "open" ? "vertical" : "horizontal"}
        />
        {variant !== "open" && <ShortDateTime time={quack?.createdAt} />}
      </div>
      {variant !== "replying-to" && <QuackOptionButton quack={quack} />}
    </div>
  );
};

export { QuackHeader };
