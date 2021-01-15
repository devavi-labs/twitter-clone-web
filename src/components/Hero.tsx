import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useLocation } from "react-router-dom";
import { AppBar, ProfileFeed, QuacksFeed } from ".";
import { useUserByUsernameQuery } from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface HeroProps {
  feed?: "home" | "profile";
}

export const Hero: React.FC<HeroProps> = ({ feed: feedFromProps }) => {
  const { md } = useMediaQuery();
  const useStyles = makeStyles(({ palette: { secondary } }) => ({
    root: {
      flex: md ? 5 : 4.7,
      background: secondary.main,
      display: "flex",
    },
    subRoot: {
      flex: 1,
      maxWidth: md ? 600 : "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    },
  }));
  const classes = useStyles();

  const { pathname, state } = useLocation<{
    feed?: "home" | "profile";
    username?: string;
  }>();

  const feed = state?.feed || feedFromProps;
  const username = state?.username || pathname.slice(1);

  const [{ data, fetching }] = useUserByUsernameQuery({
    variables: { username },
    pause: feed !== "profile",
  });

  const title =
    feed === "profile" && Boolean(data?.userByUsername)
      ? data?.userByUsername?.displayName
      : feed;

  const subtitle =
    feed === "profile" && Boolean(data?.userByUsername)
      ? `${data?.userByUsername?.quacks} Quacks`
      : "";

  return (
    <Box className={classes.root}>
      <Box className={classes.subRoot}>
        <AppBar
          title={title}
          subtitle={subtitle}
          backButton={Boolean(subtitle)}
        />

        {feed === "home" ? (
          <QuacksFeed />
        ) : feed === "profile" ? (
          <ProfileFeed user={data?.userByUsername} loading={fetching} />
        ) : (
          <></>
        )}
      </Box>
      <Divider orientation="vertical" />
    </Box>
  );
};
