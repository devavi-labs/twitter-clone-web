import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { LeftSidebar } from "../components";

export const Dashboard = () => {
  const useStyles = makeStyles(({ palette: { secondary } }) => ({
    root: {
      flex: 1,
      display: "flex",
    },
    leftSidebar: {
      flex: 2,
      background: secondary.main,
    },
    feeds: {
      flex: 4.7,
      background: secondary.main,
    },
    rightSidebar: {
      flex: 3.3,
      background: secondary.main,
    },
  }));

  const classes = useStyles();
  return (
    <Box component="main">
      <Box className={classes.root}>
        <LeftSidebar />
        <Divider orientation="vertical" />
        <Box className={classes.feeds}></Box>
        <Divider orientation="vertical" />
        <Box component="aside" className={classes.rightSidebar}></Box>
      </Box>
    </Box>
  );
};
