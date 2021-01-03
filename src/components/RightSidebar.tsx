import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const RightSidebar = () => {
  const { md, sm } = useMediaQuery();
  const useStyles = makeStyles(({ palette: { secondary } }) => ({
    root: {
      flex: md ? 3 : 3.3,
      background: secondary.main,
    },
  }));
  const classes = useStyles();
  if (sm) return <></>;
  return <Box className={classes.root}></Box>;
};
