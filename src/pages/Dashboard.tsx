import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useLocation } from "react-router-dom";
import { LeftSidebar, Hero, Splash } from "../components";
import { useUserByUsernameQuery } from "../generated/graphql";

interface DashboardProps {
  popup?: "display-settings" | "compose-quack";
  feed?: "home" | "profile";
}

export const Dashboard: React.FC<DashboardProps> = ({
  popup: popupFromProps,
  feed: feedFromProps,
}) => {
  const useStyles = makeStyles(({ palette: { secondary } }) => ({
    root: {
      flex: 1,
      display: "flex",
    },

    rightSidebar: {
      flex: 3.3,
      background: secondary.main,
    },
  }));

  const classes = useStyles();

  const { pathname, state } = useLocation<DashboardProps>();

  const popup = state?.popup || popupFromProps;
  const feed = state?.feed || feedFromProps;

  const [{ fetching }] = useUserByUsernameQuery({
    variables: {
      username: pathname.slice(1),
    },
    pause: feed === "home",
  });

  if (fetching) {
    return <Splash />;
  }

  return (
    <Box component="main">
      <Box className={classes.root}>
        <LeftSidebar popup={popup} />
        <Divider orientation="vertical" />
        <Hero feed={feed} />
        <Divider orientation="vertical" />
        <Box component="aside" className={classes.rightSidebar}></Box>
      </Box>
    </Box>
  );
};
