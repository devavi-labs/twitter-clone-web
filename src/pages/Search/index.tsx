import { AppBar as MuiAppBar, Divider, Tab, Tabs } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import {
  AppBar,
  InstantSearchResults,
  SearchBar,
  SearchResults,
  TabPanel,
} from "../../components";
import { useMediaQuery, useSearchQuery, useInstantSearch } from "../../hooks";
import { a11yProps } from "../../utils/a11yProps";
import { useStyles } from "./styles";

export const Search: React.FC = () => {
  const classes = useStyles();

  const query = useSearchQuery();

  const theme = useTheme();

  const history = useHistory();

  const [{ open }, { handleClose }] = useInstantSearch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(handleClose, [history.location.search]);

  const handleBack = () => {
    if (xs && open) {
      handleClose();
    } else {
      history.replace("/explore");
    }
  };

  const { xs } = useMediaQuery();

  const tab = query.get("f") === "user" ? 1 : 0;

  const [value, setValue] = React.useState(tab ?? 0);

  React.useEffect(() => {
    if (tab && tab !== value) {
      setValue(tab);
    }
  }, [tab, value]);

  const changeTab = (index: number) => {
    switch (index) {
      case 1:
        return history.replace(`/search${history.location.search}&f=user`);
      default:
        return history.replace(
          `/search${history.location.search.replace(/&f=user/gi, "")}`
        );
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
    <main className={classes.searchPage}>
      <AppBar
        bottomDivider={false}
        position="static"
        backButton
        onBack={handleBack}
      >
        <SearchBar input={query.get("q") ?? undefined} />
      </AppBar>
      {xs && open ? (
        <InstantSearchResults />
      ) : (
        <React.Fragment>
          <MuiAppBar position="sticky" color="secondary" elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="Search types"
              variant="fullWidth"
              scrollButtons="on"
            >
              <Tab label="Quacks" {...a11yProps(0)} className={classes.tab} />
              <Tab label="Users" {...a11yProps(1)} className={classes.tab} />
            </Tabs>
          </MuiAppBar>
          <Divider />
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <SearchResults query={query.get("q")} type="quack" />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <SearchResults query={query.get("q")} type="user" />
            </TabPanel>
          </SwipeableViews>
        </React.Fragment>
      )}
    </main>
  );
};
