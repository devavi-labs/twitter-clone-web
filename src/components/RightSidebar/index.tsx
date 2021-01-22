import React from "react";
import { AppBar, SearchBar, SidebarNewsFeed } from "../../components";
import { useStyles } from "./styles";
import { useLocation } from "react-router-dom";

export const RightSidebar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const toShowSearchbar = !/(explore|search)/gi.test(pathname);

  return (
    <aside className={classes.rightSidebar}>
      {toShowSearchbar && (
        <AppBar position="sticky" bottomDivider={false}>
          <SearchBar />
        </AppBar>
      )}
      <div className={classes.feed}>
        <SidebarNewsFeed />
      </div>
    </aside>
  );
};
