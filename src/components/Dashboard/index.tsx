import React from "react";
import { Drawer, Hero, LeftSidebar, RightSidebar } from "..";
import { useDrawer } from "../../hooks";
import { DashboardRoutes } from "../../routes";
import { useStyles } from "./styles";

export const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [{ open, onClose }] = useDrawer();

  return (
    <main>
      <div className={classes.dashboard}>
        <LeftSidebar />
        <Hero>
          <DashboardRoutes />
        </Hero>
        <RightSidebar />
        <Drawer open={open} onClose={() => (onClose ? onClose() : {})} />
      </div>
    </main>
  );
};
