import {
  Box,
  Divider,
  Typography,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { useDisclosure } from "../hooks/useDisclosure";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Drawer } from ".";

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
  const { xs } = useMediaQuery();
  const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
    root: {
      padding: xs ? "0 0.2rem" : "0 1rem",
      display: "flex",
      alignItems: "center",
      height: "50px",
    },
    prefix: {
      marginRight: xs ? "0.4rem" : "1rem",
    },
    backIcon: {
      color: primary.main,
    },
    avatar: {
      width: 30,
      height: 30,
    },
    title: {
      color: text.primary,
      opacity: type === "dark" ? 0.8 : 1,
      fontSize: "1.1rem",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    subtitle: {
      color: text.secondary,
      fontSize: "0.8rem",
    },
  }));
  const classes = useStyles();

  const { goBack } = useHistory();

  const [{ data }] = useMeQuery();

  const { open, toggle, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box className={classes.root}>
        {backButton ? (
          <IconButton size="medium" className={classes.prefix} onClick={goBack}>
            <BsArrowLeft className={classes.backIcon} />
          </IconButton>
        ) : (
          data &&
          xs && (
            <IconButton
              size="medium"
              className={classes.prefix}
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
      </Box>
      <Divider />
      <Drawer open={open} onOpen={onOpen} onClose={onClose} />
    </>
  );
};
