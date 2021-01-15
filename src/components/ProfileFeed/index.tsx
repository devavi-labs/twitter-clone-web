import { Divider, AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import React from "react";
import {
  Profile,
  ProfileLikes,
  ProfileQuacks,
  ProfileRequacks,
  TabPanel,
} from "..";
import { RegularUserFragment } from "../../generated/graphql";
import { useHistory } from "react-router-dom";
import { CombinedError } from "urql";
import { CircularProgressBar, ErrorDisplay, RoundedButton } from "..";

type ProfileFeedProps = {
  user?: RegularUserFragment | null;
  loading?: boolean;
  error?: CombinedError | null;
  tab?: number;
  fallbackUsername?: string;
};

const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  "aria-controls": `full-width-tabpanel-${index}`,
});

const ProfileFeed: React.FC<ProfileFeedProps> = ({
  user,
  loading,
  error,
  tab,
  fallbackUsername,
}) => {
  const useStyles = makeStyles(({ palette: { text } }) => ({
    root: {},
    loading: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem 0",
    },
    container: {
      margin: "1rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.6rem",
      textAlign: "center",
      padding: "0 1rem",
    },
    heading: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    content: {
      fontSize: "0.9rem",
      color: text.secondary,
    },
    tab: {
      textTransform: "none",
      fontWeight: "bold",
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  const [viewQuacks, setViewQuacks] = React.useState(false);

  React.useEffect(() => {
    if (
      !user?.amIBlockedByThisUser &&
      !user?.haveIBlockedThisUser &&
      !user?.amIDeactivated
    ) {
      setViewQuacks(true);
    }
  }, [
    user?.amIBlockedByThisUser,
    user?.amIDeactivated,
    user?.haveIBlockedThisUser,
    viewQuacks,
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
        return history.replace(`/${user?.username}/requacks`);
      case 2:
        return history.replace(`/${user?.username}/likes`);
      default:
        return history.replace(`/${user?.username}`);
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

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgressBar />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Profile
        user={user}
        loading={loading}
        fallbackUsername={fallbackUsername}
      />
      {user ? (
        <div>
          {(user?.amIBlockedByThisUser || user?.haveIBlockedThisUser) &&
          !viewQuacks ? (
            <>
              <Divider />
              <div className={classes.container}>
                {user?.haveIBlockedThisUser && (
                  <Typography component="h2" className={classes.heading}>
                    @{user?.username} is blocked
                  </Typography>
                )}
                {user?.amIBlockedByThisUser ? (
                  <Typography className={classes.content}>
                    You are blocked from following @{user?.username} and viewing
                    @{user?.username}'s Quacks.
                  </Typography>
                ) : (
                  <>
                    <Typography className={classes.content}>
                      Are you sure you want to view these Quacks? Viewing Quacks
                      won’t unblock @{user?.username}.
                    </Typography>
                    <RoundedButton
                      variant="outlined"
                      color="primary"
                      onClick={() => setViewQuacks(true)}
                    >
                      View Quacks
                    </RoundedButton>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <AppBar position="static" color="transparent" elevation={0}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab
                    label="Quacks"
                    {...a11yProps(0)}
                    className={classes.tab}
                  />
                  <Tab
                    label="Requacks"
                    {...a11yProps(1)}
                    className={classes.tab}
                  />
                  <Tab
                    label="Likes"
                    {...a11yProps(2)}
                    className={classes.tab}
                  />
                </Tabs>
              </AppBar>
              <Divider />
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <ProfileQuacks userId={user?.id!} loading={loading} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <ProfileRequacks userId={user?.id!} loading={loading} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <ProfileLikes userId={user?.id!} loading={loading} />
                </TabPanel>
              </SwipeableViews>
            </>
          )}
        </div>
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

export { ProfileFeed };
