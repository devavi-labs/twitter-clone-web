import {
  AppBar as MuiAppBar,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import {
  AppBar,
  CircularProgressBar,
  ErrorDisplay,
  FollowStats as StatUsers,
  RoundedButton,
  TabPanel,
} from "../../components";
import { useUserByUsernameQuery } from "../../generated/graphql";
import { a11yProps } from "../../utils/a11yProps";
import { useStyles } from "./styles";

type FollowStatsProps = {
  tab: number;
};

export const FollowStats: React.FC<FollowStatsProps> = ({ tab }) => {
  const { username } = useParams<{
    username?: string;
  }>();

  const [{ data, fetching, error }] = useUserByUsernameQuery({
    variables: { username: username! },
    pause: !username,
  });

  const classes = useStyles();
  const theme = useTheme();

  const [viewStats, setViewStats] = React.useState(false);

  React.useEffect(() => {
    if (
      !data?.userByUsername?.amIBlockedByThisUser &&
      !data?.userByUsername?.haveIBlockedThisUser &&
      !data?.userByUsername?.amIDeactivated
    ) {
      setViewStats(true);
    }
  }, [
    data?.userByUsername?.amIBlockedByThisUser,
    data?.userByUsername?.amIDeactivated,
    data?.userByUsername?.haveIBlockedThisUser,
    viewStats,
  ]);

  const [value, setValue] = React.useState(tab);

  React.useEffect(() => {
    if (tab && tab !== value) {
      setValue(tab);
    }
  }, [tab, value]);

  const history = useHistory();

  const changeTab = (index: number) => {
    switch (index) {
      case 1:
        return history.replace(`/${data?.userByUsername?.username}/following`);
      default:
        return history.replace(`/${data?.userByUsername?.username}/followers`);
    }
  };

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    changeTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
    changeTab(index);
  };

  if (error) {
    return (
      <ErrorDisplay
        error={error ? (error.networkError ? "network" : "other") : null}
      />
    );
  }

  if (fetching) {
    return (
      <div className={classes.loading}>
        <CircularProgressBar />
      </div>
    );
  }

  return (
    <div className={classes.followStats}>
      <AppBar
        backButton
        title={data?.userByUsername?.displayName || `@${username}`}
        subtitle={
          data?.userByUsername
            ? (data?.userByUsername?.quacks || 0) + " Quacks"
            : undefined
        }
      />

      {data?.userByUsername ? (
        (data?.userByUsername?.amIBlockedByThisUser ||
          data?.userByUsername?.haveIBlockedThisUser) &&
        !viewStats ? (
          <React.Fragment>
            <Divider />
            <div className={classes.container}>
              {data?.userByUsername?.haveIBlockedThisUser && (
                <Typography component="h2" className={classes.heading}>
                  @{data?.userByUsername?.username} is blocked
                </Typography>
              )}
              {data?.userByUsername?.amIBlockedByThisUser ? (
                <Typography className={classes.content}>
                  You are blocked from following @
                  {data?.userByUsername?.username} and viewing @
                  {data?.userByUsername?.username}'s Quacks.
                </Typography>
              ) : (
                <React.Fragment>
                  <Typography className={classes.content}>
                    Are you sure you want to view these Quacks? Viewing Quacks
                    won’t unblock @{data?.userByUsername?.username}.
                  </Typography>
                  <RoundedButton
                    variant="outlined"
                    color="primary"
                    onClick={() => setViewStats(true)}
                  >
                    View Quacks
                  </RoundedButton>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <MuiAppBar position="static" color="transparent" elevation={0}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="follow stats"
              >
                <Tab
                  label="Followers"
                  {...a11yProps(0)}
                  className={classes.tab}
                />
                <Tab
                  label="Following"
                  {...a11yProps(1)}
                  className={classes.tab}
                />
              </Tabs>
            </MuiAppBar>
            <Divider />
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <StatUsers userId={data?.userByUsername?.id} type="followers" />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <StatUsers userId={data?.userByUsername?.id} type="following" />
              </TabPanel>
            </SwipeableViews>
          </React.Fragment>
        )
      ) : (
        <>
          <Divider />
          <div className={classes.container}>
            <Typography component="h2" className={classes.heading}>
              This account doesn’t exist
            </Typography>
            <Typography className={classes.content}>
              Try searching for another.
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};
