import { Box, Divider } from "@material-ui/core";
import React from "react";
import { Stat } from "..";
import { RegularQuackFragment } from "../../generated/graphql";
import { useStyles } from "./styles";

interface QuackStatsProps {
  quack?: RegularQuackFragment;
}

export const QuackStats: React.FC<QuackStatsProps> = ({ quack }) => {
  const classes = useStyles();

  if (
    (quack?.replies && quack.replies > 0) ||
    (quack?.requacks && quack.requacks > 0) ||
    (quack?.likes && quack.likes > 0)
  ) {
    return (
      <React.Fragment>
        <Box className={classes.stats}>
          {quack?.replies && quack.replies > 0 ? (
            <Stat label="Replies" stat={quack.replies} />
          ) : (
            <React.Fragment />
          )}
          {quack?.requacks && quack.requacks > 0 ? (
            <Stat
              label="Requacks"
              stat={quack.requacks}
              href={`/${quack.quackedByUser?.username}/quack/${quack.id}/requacks`}
            />
          ) : (
            <React.Fragment />
          )}
          {quack?.likes && quack.likes > 0 ? (
            <Stat
              label="Likes"
              stat={quack.likes}
              href={`/${quack.quackedByUser?.username}/quack/${quack.id}/likes`}
            />
          ) : (
            <React.Fragment />
          )}
        </Box>
        <Divider />
      </React.Fragment>
    );
  }
  return <React.Fragment />;
};
