import { AppBar as MuiAppBar, Tabs, Tab, Divider } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  "aria-controls": `full-width-tabpanel-${index}`,
});

export const Explore = () => {
  const useStyles = makeStyles(({ breakpoints: { down } }) => ({
    explore: {
      flexGrow: 1,
      width: "100%",
    },
    tabs: {
      maxWidth: 600,
      [down("xs")]: {
        maxWidth: "100vw",
      },
    },
    tab: {
      textTransform: "none",
      fontWeight: "bold",
    },
  }));
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
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
              <Tab label="Politics" {...a11yProps(3)} className={classes.tab} />
              <Tab label="Sports" {...a11yProps(4)} className={classes.tab} />
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
              <NewsFeed type="politics" />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              <NewsFeed type="sports" />
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
