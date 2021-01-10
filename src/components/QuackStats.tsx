import { Box, Divider, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { RegularQuackFragment, ShortQuackFragment } from "../generated/graphql";

interface QuackStatsProps {
  quack?: RegularQuackFragment | ShortQuackFragment;
}

export const QuackStats: React.FC<QuackStatsProps> = ({ quack }) => {
  const truncatedTextStyle = {
    display: "inline-block",
    maxWidth: "10rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as const;

  const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
    primaryText: {
      color: text.primary,
      opacity: 0.9,
      fontSize: "0.9rem",
      fontWeight: "bold",
      ...truncatedTextStyle,
    },
    secondaryText: {
      color: text.secondary,
      fontSize: "0.8rem",
      ...truncatedTextStyle,
    },
    stats: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem 0",
    },
    stat: {
      fontSize: "1.1rem !important",
      display: "flex",
      alignItems: "flex-end",
      gap: "0.2rem",
    },
  }));
  const classes = useStyles();

  if (
    (quack?.replies && quack.replies.length > 0) ||
    (quack?.requacks && quack.requacks.length > 0) ||
    (quack?.likes && quack.likes.length > 0)
  ) {
    return (
      <>
        <Box className={classes.stats}>
          {quack?.replies && quack.replies.length > 0 && (
            <Link className={classes.stat}>
              <Typography component="span" className={classes.primaryText}>
                {quack.replies.length}
              </Typography>
              <Typography component="span" className={classes.secondaryText}>
                Replies
              </Typography>
            </Link>
          )}
          {quack?.requacks && quack.requacks.length > 0 && (
            <Link className={classes.stat}>
              <Typography component="span" className={classes.primaryText}>
                {quack.requacks.length}
              </Typography>
              <Typography component="span" className={classes.secondaryText}>
                Requacks
              </Typography>
            </Link>
          )}
          {quack?.likes && quack.likes.length > 0 && (
            <Link className={classes.stat}>
              <Typography component="span" className={classes.primaryText}>
                {quack.likes.length}
              </Typography>
              <Typography component="span" className={classes.secondaryText}>
                Likes
              </Typography>
            </Link>
          )}
        </Box>
        <Divider />
      </>
    );
  }
  return <></>;
};
