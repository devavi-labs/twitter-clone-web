import React from "react";
import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BiBadgeCheck } from "react-icons/bi";

export const SampleQuack = () => {
  const useStyles = makeStyles(
    ({ palette: { primary, text, type, divider } }) => ({
      root: {
        width: "100%",
        display: "flex",
        padding: "1rem 0.5rem",
        border: `0.5px solid ${divider}`,
        borderRadius: "1rem",
        maxWidth: "500px",
        margin: "1rem 0",
      },
      left: {
        padding: "0.1rem 0.4rem",
      },
      right: {
        display: "flex",
        flexDirection: "column",
        padding: "0.1rem",
        paddingRight: "1.5rem",
      },
      header: {
        display: "flex",
        alignItems: "center",
      },
      displayName: {
        display: "flex",
        alignItems: "center",
        color: text.primary,
        fontSize: "0.9rem",
        fontWeight: "bold",
      },
      verifiedBadge: {
        marginTop: "-0.2rem",
        marginLeft: "0.2rem",
        color: type === "dark" ? text.primary : primary.main,
        fontSize: "1.2rem",
      },
      handle: {
        color: text.primary,
        fontSize: "0.9rem",
        opacity: 0.8,
        margin: "0 0.4rem",
      },
      time: {
        color: text.primary,
        fontSize: "0.9rem",
        opacity: 0.8,
      },
      text: {
        color: text.primary,
        fontSize: "0.9rem",
      },
    })
  );
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
          this one — which can include links, and text!
        </Typography>
      </Box>
    </Box>
  );
};
