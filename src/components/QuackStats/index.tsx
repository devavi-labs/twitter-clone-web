import { Box, Divider, Link, Typography } from "@material-ui/core";
import React from "react";
import { RegularQuackFragment } from "../../generated/graphql";
import { useStyles } from "./styles";

interface QuackStatsProps {
  quack?: RegularQuackFragment;
}

export const QuackStats: React.FC<QuackStatsProps> = ({ quack }) => {
  const classes = useStyles();

  if (
    (quack?.replies && quack.replies.length > 0) ||
    (quack?.requacks && quack.requacks > 0) ||
    (quack?.likes && quack.likes > 0)
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
          {quack?.requacks && quack.requacks > 0 && (
            <Link className={classes.stat}>
              <Typography component="span" className={classes.primaryText}>
                {quack.requacks || 0}
              </Typography>
              <Typography component="span" className={classes.secondaryText}>
                Requacks
              </Typography>
            </Link>
          )}
          {quack?.likes && quack.likes > 0 && (
            <Link className={classes.stat}>
              <Typography component="span" className={classes.primaryText}>
                {quack.likes || 0}
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
