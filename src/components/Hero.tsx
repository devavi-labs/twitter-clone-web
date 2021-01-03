import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useLocation } from "react-router-dom";
import { AppBar, CreateQuack } from ".";
import { useUserByUsernameQuery } from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface HeroProps {
  feed?: "home" | "profile";
}

export const Hero: React.FC<HeroProps> = ({ feed: feedFromProps }) => {
  const { md, xs } = useMediaQuery();
  const useStyles = makeStyles(({ palette: { secondary } }) => ({
    root: {
      flex: md ? 5 : 4.7,
      background: secondary.main,
      display: "flex",
    },
    subRoot: {
      flex: 1,
      maxWidth: md ? 600 : "auto",
    },
  }));
  const classes = useStyles();

  const { pathname, state } = useLocation<{
    feed?: "home" | "profile";
    username?: string;
  }>();

  const feed = state?.feed || feedFromProps;
  const username = state?.username || pathname.slice(1);

  const [{ data }] = useUserByUsernameQuery({
    variables: { username },
    pause: feed !== "profile",
  });

  const title =
    feed === "profile" && Boolean(data?.userByUsername)
      ? data?.userByUsername?.displayName
      : feed;

  const subtitle =
    feed === "profile" && Boolean(data?.userByUsername)
      ? `${data?.userByUsername?.quacks?.length} Quacks`
      : "";

  return (
    <Box className={classes.root}>
      <Divider orientation="vertical" />
      <Box className={classes.subRoot}>
        <AppBar
          title={title}
          subtitle={subtitle}
          backButton={Boolean(subtitle)}
        />
        {feed === "home" && !xs && <CreateQuack />}
      </Box>
      <Divider orientation="vertical" />
    </Box>
  );
};
