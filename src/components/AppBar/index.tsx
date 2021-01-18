import {
  AppBar as MuiAppBar,
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
import { DrawerContext } from "../../context/drawer";
import { useMeQuery } from "../../generated/graphql";
import { useStyles } from "./styles";

interface AppBarProps {
  title?: string;
  subtitle?: string;
  backButton?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  title = "Home",
  subtitle,
  backButton,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [{ data }] = useMeQuery();

  const { toggle } = React.useContext(DrawerContext)!;

  return (
    <>
      <MuiAppBar position="sticky" elevation={0}>
        <Toolbar className={classes.root}>
          {backButton ? (
            <IconButton
              size="medium"
              className={classes.prefix}
              onClick={() => history.goBack()}
            >
              <BsArrowLeft className={classes.backIcon} />
            </IconButton>
          ) : (
            data && (
              <IconButton
                size="medium"
                className={[classes.prefix, classes.drawerToggleBtn].join(" ")}
                onClick={toggle}
              >
                <Avatar
                  src={data?.me?.displayPicture}
                  className={classes.avatar}
                />
              </IconButton>
            )
          )}
          <Box>
            <Typography component="h2" className={classes.title}>
              {title}
            </Typography>
            <Typography component="span" className={classes.subtitle}>
              {subtitle}
            </Typography>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Divider />
    </>
  );
};
