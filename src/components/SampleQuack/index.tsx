import React from "react";
import { Avatar, Box, Typography } from "@material-ui/core";
import { BiBadgeCheck } from "react-icons/bi";
import { useStyles } from "./styles";

export const SampleQuack = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <Avatar src="/logo192.png" />
      </Box>
      <Box className={classes.right}>
        <Box className={classes.header}>
          <Typography className={classes.displayName}>
            Quacker <BiBadgeCheck className={classes.verifiedBadge} />
          </Typography>
          <Typography className={classes.handle}>@Quacker</Typography>
          <Typography className={classes.time}> · 1h</Typography>
        </Box>
        <Typography paragraph className={classes.text}>
          At the heart of Quacker are short messages called Quacks — just like
          this one — which can include links, hashtags and text!
        </Typography>
      </Box>
    </Box>
  );
};
