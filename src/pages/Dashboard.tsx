import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  DisplaySettingsModal,
  Hero,
  LeftSidebar,
  RightSidebar,
} from "../components";
import { CreateQuackModal } from "../components/CreateQuackModal";
import { FeedContext } from "../context/feed";
import { useBetterGoBack } from "../hooks/useBetterGoBack";
import { useLocationManager } from "../hooks/useLocationManager";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface DashboardProps {
  popup?: "display-settings" | "compose-quack";
  feed?: "home" | "profile";
  tab?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  popup: popupFromProps,
  feed: feedFromProps,
  tab: tabFromProps = 0,
}) => {
  const { xs } = useMediaQuery();

  const useStyles = makeStyles(() => ({
    root: {
      flex: 1,
      display: "flex",
    },
  }));

  const classes = useStyles();
  const { state } = useLocation<DashboardProps>();
  const { username } = useParams<{ username?: string }>();

  const popup = state?.popup || popupFromProps;
  const feed = state?.feed || feedFromProps;
  const tab = state?.tab || tabFromProps;

  const { state: feedState, setState } = useContext(FeedContext)!;

  useEffect(() => {
    if (
      feedState?.feed !== feed ||
      feedState?.username !== username ||
      feedState?.tab !== tab
    ) {
      setState({
        feed,
        username,
        tab,
      });
    }
  }, [
    feed,
    feedState?.feed,
    feedState?.tab,
    feedState?.username,
    setState,
    tab,
    username,
  ]);

  useLocationManager();
  const goBackOrReplace = useBetterGoBack();

  const onModalClose = () => {
    goBackOrReplace("/");
  };

  return (
    <>
      <Box component="main">
        <Box className={classes.root}>
          {!xs && <LeftSidebar />}
          <Hero feed={feed} tab={tab} />
          <RightSidebar />
        </Box>
      </Box>
      <DisplaySettingsModal
        open={popup === "display-settings"}
        onClose={onModalClose}
      />
      <CreateQuackModal
        open={popup === "compose-quack"}
        onClose={onModalClose}
      />
    </>
  );
};
