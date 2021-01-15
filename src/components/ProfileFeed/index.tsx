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

type ProfileFeedProps = {
  user?: RegularUserFragment | null;
  loading?: boolean;
};

const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  "aria-controls": `full-width-tabpanel-${index}`,
});

const ProfileFeed: React.FC<ProfileFeedProps> = ({ user, loading }) => {
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

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
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
            <AppBar position="static" color="transparent">
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
                <ProfileQuacks userId={user?.id!} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <ProfileRequacks userId={user?.id!} />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <ProfileLikes userId={user?.id!} />
              </TabPanel>
            </SwipeableViews>
          </>
        )}
      </div>
    </div>
  );
};

export { ProfileFeed };
