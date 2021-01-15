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
import { RoundedButton } from "..";
import { useHistory } from "react-router-dom";

type ProfileFeedProps = {
  user?: RegularUserFragment | null;
  loading?: boolean;
  tab?: number;
};

const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  "aria-controls": `full-width-tabpanel-${index}`,
});

const ProfileFeed: React.FC<ProfileFeedProps> = ({ user, loading, tab }) => {
  const useStyles = makeStyles(({ palette: { text } }) => ({
    root: {},

    blockedMessageContainer: {
      margin: "1rem 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.6rem",
      textAlign: "center",
      padding: "0 1rem",
    },
    blockedHeading: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    blockedContent: {
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

  const [value, setValue] = React.useState(0);

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

  return (
    <div className={classes.root}>
      <Profile user={user} loading={loading} />
      <div>
        {(user?.amIBlockedByThisUser || user?.haveIBlockedThisUser) &&
        !viewQuacks ? (
          <>
            <Divider />
            <div className={classes.blockedMessageContainer}>
              {user?.haveIBlockedThisUser && (
                <Typography component="h2" className={classes.blockedHeading}>
                  @{user?.username} is blocked
                </Typography>
              )}
              {user?.amIBlockedByThisUser ? (
                <Typography className={classes.blockedContent}>
                  You are blocked from following @{user?.username} and viewing @
                  {user?.username}'s Quacks.
                </Typography>
              ) : (
                <>
                  <Typography className={classes.blockedContent}>
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
                <Tab label="Quacks" {...a11yProps(0)} className={classes.tab} />
                <Tab
                  label="Requacks"
                  {...a11yProps(1)}
                  className={classes.tab}
                />
                <Tab label="Likes" {...a11yProps(2)} className={classes.tab} />
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
    </div>
  );
};

export { ProfileFeed };
