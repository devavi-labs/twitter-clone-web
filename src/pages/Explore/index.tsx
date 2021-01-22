import { AppBar as MuiAppBar, Tabs, Tab, Divider } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import {
  SearchBar,
  AppBar,
  TabPanel,
  NewsFeed,
  InstantSearchResults,
} from "../../components";
import SwipeableViews from "react-swipeable-views";
import { useMediaQuery, useInstantSearch } from "../../hooks";
import { a11yProps } from "../../utils/a11yProps";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";

type ExploreProps = {
  tab?: number;
};

export const Explore: React.FC<ExploreProps> = ({ tab }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(tab ?? 0);

  React.useEffect(() => {
    if (tab && tab !== value) {
      setValue(tab);
    }
  }, [tab, value]);

  const history = useHistory();

  const changeTab = (index: number) => {
    switch (index) {
      case 1:
        return history.replace("/explore/tabs/health");
      case 2:
        return history.replace("/explore/tabs/science");
      case 3:
        return history.replace("/explore/tabs/sports");
      case 4:
        return history.replace("/explore/tabs/business");
      case 5:
        return history.replace("/explore/tabs/movies");
      default:
        return history.replace(`/explore/tabs/world`);
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

  const theme = useTheme();

  const [{ open }, { handleClose }] = useInstantSearch();

  const { xs } = useMediaQuery();

  return (
    <main className={classes.explore}>
      <AppBar
        bottomDivider={false}
        position="static"
        backButton={xs && open}
        onBack={handleClose}
      >
        <SearchBar />
      </AppBar>
      {xs && open ? (
        <InstantSearchResults />
      ) : (
        <React.Fragment>
          <MuiAppBar
            position="sticky"
            color="secondary"
            elevation={0}
            className={classes.tabs}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="News sections"
              variant="scrollable"
              scrollButtons="on"
            >
              <Tab label="World" {...a11yProps(0)} className={classes.tab} />
              <Tab label="Health" {...a11yProps(1)} className={classes.tab} />
              <Tab label="Science" {...a11yProps(2)} className={classes.tab} />
              <Tab label="Sports" {...a11yProps(4)} className={classes.tab} />
              <Tab label="Business" {...a11yProps(3)} className={classes.tab} />
              <Tab label="Movies" {...a11yProps(5)} className={classes.tab} />
            </Tabs>
          </MuiAppBar>
          <Divider />
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <NewsFeed type="world" />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <NewsFeed type="health" />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <NewsFeed type="science" />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <NewsFeed type="sports" />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              <NewsFeed type="business" />
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
              <NewsFeed type="movies" />
            </TabPanel>
          </SwipeableViews>
        </React.Fragment>
      )}
    </main>
  );
};
