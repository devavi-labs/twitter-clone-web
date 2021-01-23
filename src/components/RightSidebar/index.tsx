import React from "react";
import {
  AppBar,
  SearchBar,
  SidebarNewsFeed,
  NewToQuackerCard,
} from "../../components";
import { useStyles } from "./styles";
import { useLocation } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";

export const RightSidebar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const toShowSearchbar = !/(explore|search)/gi.test(pathname);

  const [{ data }] = useMeQuery();

  return (
    <aside className={classes.rightSidebar}>
      {data && data.me ? (
        <React.Fragment>
          {toShowSearchbar && (
            <AppBar position="sticky" bottomDivider={false}>
              <SearchBar />
            </AppBar>
          )}
          <div className={classes.feed}>
            <SidebarNewsFeed />
          </div>
        </React.Fragment>
      ) : (
        <NewToQuackerCard />
      )}
    </aside>
  );
};
