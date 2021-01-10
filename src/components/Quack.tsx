import { Box, Divider, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  FullDateTime,
  LinkCard,
  QuackContent,
  QuackOptionButton,
  QuackStats,
  ReplyingSubheader,
  ShortDateTime,
  UserAvatar,
} from ".";
import { UserPopperContext } from "../context/userPopper";
import { RegularQuackFragment, ShortQuackFragment } from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { DisplayName } from "./DisplayName";
import { EngageButton } from "./EngageButton";

interface QuackProps {
  quack: RegularQuackFragment | ShortQuackFragment;
  inReplyTo?: RegularQuackFragment | ShortQuackFragment;
  showBar?: "top" | "bottom";
  variant?: "contained" | "open" | "reply";
}

export const Quack: React.FC<QuackProps> = ({
  quack,
  inReplyTo,
  showBar,
  variant = "contained",
}) => {
  const { xs } = useMediaQuery();

  const useStyles = makeStyles(({ palette: { text, type } }) => ({
    root: {
      display: "flex",
      alignItems: "flex-start",
      textTransform: "unset",
      padding: "0.2rem !important",
      paddingTop: "0.75rem !important",
      cursor: variant !== "open" ? "pointer" : "initial",
      transition: "background 0.2s ease-in",
      outline: "none",
      "&:hover":
        variant !== "open"
          ? {
              background:
                type === "light"
                  ? "rgba(0,0,0,0.02)"
                  : "rgba(255,255,255,0.052)",
              outline: "none",
            }
          : undefined,
      "&:focus":
        variant !== "open"
          ? {
              background:
                type === "light"
                  ? "rgba(0,0,0,0.02)"
                  : "rgba(255,255,255,0.052)",
              outline: "none",
            }
          : undefined,
    },
    left: {
      flex: 0.1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    avatarButton: {
      padding: 0,
      margin: 0,
      "&:hover": {
        opacity: 0.8,
      },
      "&:focus": {
        opacity: 0.8,
      },
    },
    avatar: {
      width: variant === "open" ? 52 : variant === "contained" ? 48 : 42,
      height: variant === "open" ? 52 : variant === "contained" ? 48 : 42,
      marginRight: variant === "open" ? "0.5rem" : 0,
    },
    connectingBar: {
      width: 2,
      position: "absolute",
      top: showBar === "bottom" ? 70 : 0,
      bottom: showBar === "bottom" ? -6 : undefined,
      background: text.primary,
      opacity: 0.2,
    },
    right: {
      flex: variant === "open" ? 1 : 0.9,
      padding: "0 0.5rem",
    },
    header: {
      width: "100%",
      display: "flex",
      alignItems: variant === "open" ? "flex-start" : "center",
      justifyContent: "space-between",
    },
    textInfo: {
      display: "flex",
      alignItems: "center",
    },
    content: {
      paddingRight: "2rem",
      paddingTop: variant === "open" ? "1rem" : 0,
    },
    text: {
      color: text.primary,
      fontSize: variant === "open" ? "1.1rem" : "0.9rem",
      opacity: 0.9,
    },

    footer: {
      display: "flex",
      justifyContent: variant === "open" ? "space-around" : "space-between",
      alignItems: "center",
      padding: variant === "open" ? "0.5rem 0" : 0,
      paddingRight: !xs ? (variant !== "open" ? "6rem" : 0) : 0,
    },
  }));
  const classes = useStyles();

  const { setOpen, setUser, setAnchorEl, setTimeout: setTO } = React.useContext(
    UserPopperContext
  )!;

  const handlePopperOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
    setUser(quack?.quackedByUser!);

    const timeout = setTimeout(() => {
      setOpen(true);
    }, 2000);

    setTO(timeout);
  };

  return (
    <ListItem tabIndex={variant !== "open" ? 0 : -1} className={classes.root}>
      {variant !== "open" && (
        <Box className={classes.left}>
          {showBar && <div className={classes.connectingBar} />}

          <UserAvatar
            user={quack?.quackedByUser}
            variant={variant}
            onMouseOver={handlePopperOpen}
          />
        </Box>
      )}
      <Box className={classes.right}>
        <Box className={classes.header}>
          <Box className={classes.textInfo}>
            {variant === "open" && (
              <UserAvatar
                user={quack?.quackedByUser}
                variant={variant}
                onMouseOver={handlePopperOpen}
              />
            )}
            <DisplayName
              displayName={quack?.quackedByUser?.displayName}
              username={quack?.quackedByUser?.username}
              link
              direction={variant === "open" ? "vertical" : "horizontal"}
              onMouseOver={handlePopperOpen}
            />
            {variant !== "open" && <ShortDateTime time={quack?.createdAt} />}
          </Box>
          <QuackOptionButton quack={quack} />
        </Box>
        {inReplyTo && (
          <ReplyingSubheader username={inReplyTo?.quackedByUser?.username} />
        )}
        <Box className={classes.content}>
          <Typography paragraph className={classes.text}>
            <QuackContent
              text={quack?.text}
              mentions={quack?.mentions}
              hashtags={quack?.hashtags}
              links={quack?.links?.map((link) => link.url)}
            />
          </Typography>
        </Box>
        {quack?.links && quack?.links?.length > 0 && quack?.links[0].title && (
          <LinkCard
            title={quack?.links[0].title}
            description={quack?.links[0].description}
            image={quack?.links[0].image}
            url={quack?.links[0].url}
          />
        )}
        {variant === "open" && (
          <>
            <FullDateTime time={quack?.createdAt} />
            <Divider />
          </>
        )}
        {variant === "open" && <QuackStats quack={quack} />}
        <Box className={classes.footer}>
          <EngageButton
            type="reply"
            engagements={quack?.replies?.length}
            size={variant === "open" ? "md" : "sm"}
          />
          <EngageButton
            type="requack"
            engagements={quack?.requacks?.length}
            status={quack?.requackStatus}
            size={variant === "open" ? "md" : "sm"}
          />
          <EngageButton
            type="like"
            engagements={quack?.likes?.length}
            status={quack?.likeStatus}
            size={variant === "open" ? "md" : "sm"}
          />
          <EngageButton type="share" size={variant === "open" ? "md" : "sm"} />
        </Box>
      </Box>
    </ListItem>
  );
};
