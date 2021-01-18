import React from "react";
import { Drawer } from "@material-ui/core";
import { useStyles } from "./styles";

export const RightSidebar = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.rightSidebar}
      variant="permanent"
      anchor="right"
      classes={{ paper: classes.paper }}
    >
      <div></div>
    </Drawer>
  );
};
