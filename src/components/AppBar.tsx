import { Box, Divider, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";

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
  const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
    root: {
      padding: "0 1rem",
      display: "flex",
      alignItems: "center",
      height: "50px",
    },
    backButton: {
      marginRight: "1rem",
    },
    backIcon: {
      color: primary.main,
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

  return (
    <>
      <Box className={classes.root}>
        {backButton && (
          <IconButton
            size="medium"
            className={classes.backButton}
            onClick={goBack}
          >
            <BsArrowLeft className={classes.backIcon} />
          </IconButton>
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
    </>
  );
};
