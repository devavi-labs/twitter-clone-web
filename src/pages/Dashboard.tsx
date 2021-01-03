import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  DisplaySettingsModal,
  Hero,
  LeftSidebar,
  RightSidebar,
  Splash,
} from "../components";
import { CreateQuackModal } from "../components/CreateQuackModal";
import { FeedContext } from "../context/feed";
import { useUserByUsernameQuery } from "../generated/graphql";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface DashboardProps {
  popup?: "display-settings" | "compose-quack";
  feed?: "home" | "profile";
}

export const Dashboard: React.FC<DashboardProps> = ({
  popup: popupFromProps,
  feed: feedFromProps,
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
  const { pathname, state } = useLocation<DashboardProps>();

  const popup = state?.popup || popupFromProps;
  const feed = state?.feed || feedFromProps;

  const [{ fetching }] = useUserByUsernameQuery({
    variables: {
      username: pathname.slice(1),
    },
    pause: feed !== "profile",
  });

  const { state: feedState, setState } = useContext(FeedContext)!;

  useEffect(() => {
    setState({
      feed: feedState?.feed,
      username: feedState?.username,
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

  if (fetching && !state) {
    return <Splash />;
  }

  return (
    <>
      <Box component="main">
        <Box className={classes.root}>
          {!xs && <LeftSidebar />}
          <Hero feed={feed} />
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
