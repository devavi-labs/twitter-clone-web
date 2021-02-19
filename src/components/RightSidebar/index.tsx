import React from "react";
import {
  AppBar,
  SearchBar,
  SidebarNewsFeed,
  NewToQuackerCard,
  Footer,
} from "../../components";
import { useStyles } from "./styles";
import { useLocation } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";
import { useMediaQuery } from "../../hooks";

export const RightSidebar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const { sm } = useMediaQuery();

  const toShowSearchbar = !/(explore|search)/gi.test(pathname);

  const [{ data }] = useMeQuery();

  return (
    <aside className={classes.rightSidebar}>
      {!sm && (
        <React.Fragment>
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
          <Footer />
        </React.Fragment>
      )}
    </aside>
  );
};
