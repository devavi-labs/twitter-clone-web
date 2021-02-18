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
  CircularProgressBar,
  ErrorDisplay,
  Profile,
  ProfileLikes,
  ProfileQuacks,
  ProfileRequacks,
  RoundedButton,
  TabPanel,
  AppBar,
} from "../../components";
import { useUserByUsernameQuery } from "../../generated/graphql";
import { useStyles } from "./styles";

type ProfilePageProps = {
  tab?: number;
};

const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  "aria-controls": `full-width-tabpanel-${index}`,
});

const ProfilePage: React.FC<ProfilePageProps> = ({ tab }) => {
  const { username } = useParams<{
    username?: string;
  }>();

  const [{ data, fetching, error }] = useUserByUsernameQuery({
    variables: { username: username! },
    pause: !username,
  });

  const classes = useStyles();
  const theme = useTheme();

  const [viewQuacks, setViewQuacks] = React.useState(false);

  React.useEffect(() => {
    if (
      !data?.userByUsername?.amIBlockedByThisUser &&
      !data?.userByUsername?.haveIBlockedThisUser
    ) {
      setViewQuacks(true);
    }
  }, [
    data?.userByUsername?.amIBlockedByThisUser,
    data?.userByUsername?.haveIBlockedThisUser,
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
        return history.replace(`/${data?.userByUsername?.username}/requacks`);
      case 2:
        return history.replace(`/${data?.userByUsername?.username}/likes`);
      default:
        return history.replace(`/${data?.userByUsername?.username}`);
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
    <div className={classes.profile}>
      <AppBar
        backButton
        title={data?.userByUsername?.displayName || "Profile"}
        subtitle={
          data?.userByUsername
            ? (data?.userByUsername?.quacks || 0) + " Quacks"
            : undefined
        }
      />
      <Profile
        user={data?.userByUsername}
        loading={fetching}
        fallbackUsername={username}
      />
      {data?.userByUsername ? (
        <div>
          {(data?.userByUsername?.amIBlockedByThisUser ||
            data?.userByUsername?.haveIBlockedThisUser) &&
          !viewQuacks ? (
            <>
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
                  <>
                    <Typography className={classes.content}>
                      Are you sure you want to view these Quacks? Viewing Quacks
                      won’t unblock @{data?.userByUsername?.username}.
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
              <MuiAppBar position="static" color="transparent" elevation={0}>
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
              </MuiAppBar>
              <Divider />
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <ProfileQuacks
                    userId={data?.userByUsername?.id!}
                    loading={fetching}
                  />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <ProfileRequacks
                    userId={data?.userByUsername?.id!}
                    loading={fetching}
                  />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <ProfileLikes
                    userId={data?.userByUsername?.id!}
                    loading={fetching}
                  />
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

export { ProfilePage };
