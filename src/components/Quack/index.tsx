import { Divider } from "@material-ui/core";
import React from "react";
import {
  ConnectingBar,
  FullDateTime,
  LinkCard,
  QuackContent,
  QuackFooter,
  QuackHeader,
  QuackLayout,
  QuackStats,
  ReplyingSubheader,
  UserAvatar,
} from "..";
import { RegularQuackFragment } from "../../generated/graphql";
import { useMediaQuery, useUserPopper } from "../../hooks";

interface QuackProps {
  quack: RegularQuackFragment;
  inReplyTo?: RegularQuackFragment;
  showBar?: boolean;
  variant?: "contained" | "open" | "reply" | "replying-to";
}

export const Quack: React.FC<QuackProps> = ({
  quack,
  inReplyTo,
  showBar,
  variant = "contained",
}) => {
  const [, { handlePopperOpen, handleMouseOut }] = useUserPopper();
  const { xs } = useMediaQuery();

  const handleMouseOver = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (variant !== "replying-to" && !xs) {
      handlePopperOpen(event, quack.quackedByUser);
    }
  };

  return (
    <QuackLayout
      variant={variant}
      left={
        <React.Fragment>
          <UserAvatar
            user={quack?.quackedByUser}
            variant={variant}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseOut}
          />
          {showBar && <ConnectingBar />}
        </React.Fragment>
      }
    >
      <QuackHeader quack={quack} variant={variant} />
      {inReplyTo && (
        <ReplyingSubheader username={inReplyTo?.quackedByUser?.username} />
      )}

      <QuackContent
        text={quack?.text}
        mentions={quack?.mentions}
        hashtags={quack?.hashtags}
        links={quack?.links?.map((link) => link.url)}
        variant={variant}
      />

      {variant !== "replying-to" &&
        quack?.links &&
        quack.links.length > 0 &&
        quack.links[0].title && (
          <LinkCard
            title={quack?.links[0].title}
            description={quack?.links[0].description}
            image={quack?.links[0].image}
            url={quack?.links[0].url}
          />
        )}

      {variant === "open" && (
        <React.Fragment>
          <FullDateTime time={quack?.createdAt} />
          <Divider />
          <QuackStats quack={quack} />
        </React.Fragment>
      )}

      {variant !== "replying-to" && (
        <QuackFooter quack={quack} variant={variant} />
      )}
    </QuackLayout>
  );
};
