import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Drawer, Hero, LeftSidebar, RightSidebar } from "..";
import { DrawerContext } from "../../context/drawer";
import { DashboardRoutes } from "../../routes";

export const Dashboard: React.FC = () => {
  const useStyles = makeStyles(() => ({
    dashboard: {
      flex: 1,
      display: "flex",
    },
  }));

  const classes = useStyles();
  const { open, onClose } = React.useContext(DrawerContext)!;

  return (
    <main>
      <div className={classes.dashboard}>
        <LeftSidebar />
        <Hero>
          <DashboardRoutes />
        </Hero>
        <RightSidebar />
        <Drawer open={open} onClose={onClose} />
      </div>
    </main>
  );
};
