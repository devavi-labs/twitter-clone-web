import React from "react";
import { Drawer, Hero, LeftSidebar, RightSidebar, BottomBanner } from "..";
import { useMeQuery } from "../../generated/graphql";
import { useDrawer } from "../../hooks";
import { DashboardRoutes } from "../../routes";
import { voidFn } from "../../utils/voidFn";
import { useStyles } from "./styles";

export const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [{ open, onClose }] = useDrawer();

  const [{ data }] = useMeQuery();
  return (
    <main>
      <div className={classes.dashboard}>
        <LeftSidebar />
        <Hero>
          <DashboardRoutes />
        </Hero>
        <RightSidebar />
        <Drawer open={open} onClose={onClose ?? voidFn} />
        {data && !data.me && <BottomBanner />}
      </div>
    </main>
  );
};
