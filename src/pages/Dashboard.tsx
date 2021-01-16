import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  DisplaySettingsModal,
  Hero,
  LeftSidebar,
  RightSidebar,
  CreateQuackModal,
} from "../components";
import { FeedContext } from "../context/feed";
import { RegularQuackFragment } from "../generated/graphql";
import { useBetterGoBack } from "../hooks/useBetterGoBack";
import { useLocationManager } from "../hooks/useLocationManager";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface DashboardProps {
  popup?: "display-settings" | "compose-quack";
  feed?: "home" | "profile";
  tab?: number;
}

type Popups = {
  "compose-quack": boolean;
  "display-settings": boolean;
};

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
  const { state } = useLocation<
    DashboardProps & { inReplyToQuack: RegularQuackFragment }
  >();
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

  const [popups, setPopups] = React.useState<Popups>({
    "compose-quack": popup === "compose-quack",
    "display-settings": popup === "display-settings",
  });

  React.useEffect(() => {
    if (popup && !popups[popup]) {
      setPopups((state) => ({
        ...state,
        [popup]: true,
      }));
    } else if (!popup && Object.values(popups).some((v) => v === true)) {
      setPopups({
        "compose-quack": false,
        "display-settings": false,
      });
    }
  }, [popup, popups]);

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
        open={popups["display-settings"]}
        onClose={onModalClose}
      />
      <CreateQuackModal
        open={popups["compose-quack"]}
        onClose={onModalClose}
        inReplyToQuack={state?.inReplyToQuack}
      />
    </>
  );
};
