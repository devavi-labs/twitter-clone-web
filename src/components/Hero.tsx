import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useLocation } from "react-router-dom";
import { AppBar, CreateQuack } from ".";
import { useUserByUsernameQuery } from "../generated/graphql";

interface HeroProps {
  feed?: "home" | "profile";
}

export const Hero: React.FC<HeroProps> = ({ feed }) => {
  const useStyles = makeStyles(({ palette: { secondary } }) => ({
    root: {
      flex: 4.7,
      background: secondary.main,
    },
  }));
  const classes = useStyles();

  const { pathname } = useLocation();

  const [{ data }] = useUserByUsernameQuery({
    variables: {
      username: pathname.slice(1),
    },
    pause: feed === "home",
  });

  const title = Boolean(data?.userByUsername)
    ? data?.userByUsername?.displayName
    : feed;

  const subtitle = Boolean(data?.userByUsername)
    ? `${data?.userByUsername?.quacks?.length} Quacks`
    : "";

  return (
    <Box className={classes.root}>
      <AppBar title={title} subtitle={subtitle} backButton={Boolean(data)} />
      {feed === "home" && <CreateQuack />}
    </Box>
  );
};
