import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useLocation } from "react-router-dom";
import { AppBar, CreateQuack, Profile } from ".";
import { useUserByUsernameQuery } from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { QuacksFeed } from ".";

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

  const [viewQuacks, setViewQuacks] = React.useState(false);

  React.useEffect(() => {
    if (feed === "home" && !viewQuacks) {
      setViewQuacks(true);
    }

    if (feed === "profile" && !viewQuacks) {
      if (
        !data?.userByUsername?.amIBlockedByThisUser &&
        !data?.userByUsername?.haveIBlockedThisUser &&
        !data?.userByUsername?.amIDeactivated
      ) {
        setViewQuacks(true);
      }
    }
  }, [
    data?.userByUsername?.amIBlockedByThisUser,
    data?.userByUsername?.amIDeactivated,
    data?.userByUsername?.haveIBlockedThisUser,
    feed,
    viewQuacks,
  ]);

  return (
    <Box className={classes.root}>
      <Box className={classes.subRoot}>
        <AppBar
          title={title}
          subtitle={subtitle}
          backButton={Boolean(subtitle)}
        />
        {feed === "home" && !xs && <CreateQuack />}
        {feed === "profile" && (
          <Profile
            user={data?.userByUsername}
            loading={fetching}
            viewQuacks={viewQuacks}
            onViewQuacks={() => setViewQuacks(true)}
          />
        )}
        <QuacksFeed
          viewQuacks={viewQuacks}
          fromUser={feed === "profile"}
          userId={data?.userByUsername?.id}
        />
      </Box>
      <Divider orientation="vertical" />
    </Box>
  );
};
