import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Avatar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";
import { useDrawer } from "../../hooks";
import { useStyles } from "./styles";

type AppBarProps = {
  title?: string;
  subtitle?: string;
  backButton?: boolean;
  onBack?: () => void;
  bottomDivider?: boolean;
} & MuiAppBarProps;

export const AppBar: React.FC<AppBarProps> = ({
  title = "Home",
  subtitle,
  backButton,
  onBack,
  bottomDivider,
  children,
  ...props
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [{ data }] = useMeQuery();

  const [, { handleOpen }] = useDrawer();

  return (
    <React.Fragment>
      <MuiAppBar className={classes.appbar} elevation={0} {...props}>
        <Toolbar className={classes.root}>
          {backButton ? (
            <IconButton
              size="medium"
              className={classes.prefix}
              onClick={onBack || history.goBack}
            >
              <BsArrowLeft className={classes.backIcon} />
            </IconButton>
          ) : (
            data && (
              <IconButton
                size="medium"
                className={[classes.prefix, classes.drawerToggleBtn].join(" ")}
                onClick={() => handleOpen()}
              >
                <Avatar
                  src={data?.me?.displayPicture}
                  className={classes.avatar}
                />
              </IconButton>
            )
          )}
          {children || (
            <Box>
              <Typography component="h2" className={classes.title}>
                {title}
              </Typography>
              <Typography component="span" className={classes.subtitle}>
                {subtitle}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </MuiAppBar>
      {bottomDivider && <Divider />}
    </React.Fragment>
  );
};
