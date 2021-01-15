import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  DisplaySettingsModal,
  Hero,
  LeftSidebar,
  RightSidebar,
} from "../components";
import { CreateQuackModal } from "../components/CreateQuackModal";
import { FeedContext } from "../context/feed";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface DashboardProps {
  popup?: "display-settings" | "compose-quack";
  feed?: "home" | "profile";
  tab?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  popup: popupFromProps,
  feed: feedFromProps,
  tab = 0,
}) => {
  const { xs } = useMediaQuery();

  const useStyles = makeStyles(() => ({
    root: {
      flex: 1,
      display: "flex",
    },
  }));

  const classes = useStyles();
  const history = useHistory();
  const { state } = useLocation<DashboardProps>();
  const { username } = useParams<{ username?: string }>();

  const popup = state?.popup || popupFromProps;
  const feed = state?.feed || feedFromProps;

  const { state: feedState, setState } = useContext(FeedContext)!;

  useEffect(() => {
    setState({
      feed,
      username,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDSModalClose = () => {
    if (feedState?.username !== undefined) {
      history.push("/" + feedState?.username);
    } else {
      history.push("/home");
    }
    history.go(0);
  };

  const onCQModalClose = () => {
    if (feedState?.username) {
      history.push("/" + feedState?.username);
    } else history.push("/home");
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
        onClose={onDSModalClose}
      />
      <CreateQuackModal
        open={popup === "compose-quack"}
        onClose={onCQModalClose}
      />
    </>
  );
};
