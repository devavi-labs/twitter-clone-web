import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type LinkCardProps = {
  image?: string | null | undefined;
  title?: string | null | undefined;
  description?: string | null | undefined;
  url: string;
};

const LinkCard: React.FC<LinkCardProps> = ({
  image,
  title,
  description,
  url,
}) => {
  const { xs } = useMediaQuery();

  const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      borderRadius: "0.6rem",
      padding: 0,
      marginBottom: "0.4rem",
    },
    innerRoot: {
      display: "flex",
      flexDirection: xs ? "column" : "row",
      alignItems: "flex-start",
      textAlign: "left",
      textTransform: "none",
    },
    right: {
      flex: xs ? 8 : 2,
      width: xs ? "100%" : "initial",
    },
    cardImage: {
      overflow: "hidden",
      height: xs ? 140 : 0,
      paddingTop: xs ? 0 : "100%",
      backgroundImage: `url(${image})`,
      backgroundSize: xs ? "cover" : "contain",
      backgroundPosition: xs ? "center" : "",
      borderTopLeftRadius: "0.6rem",
      borderBottomLeftRadius: xs ? 0 : "0.6rem",
      borderTopRightRadius: xs ? "0.6rem" : 0,
    },
    content: {
      flex: xs ? 2 : 8,
      padding: "0.8rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.2rem",
    },
    title: {
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
    description: {
      fontSize: "0.9rem",
    },
    url: {
      fontSize: "0.9rem",
      opacity: 0.5,
    },
  }));

  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      className={classes.root}
      onClick={() => window.open(url)}
      classes={{
        label: classes.innerRoot,
      }}
    >
      {image && (
        <Box className={classes.right}>
          <div className={classes.cardImage} />
        </Box>
      )}
      <Box className={classes.content}>
        {title && <Typography className={classes.title}>{title}</Typography>}
        {description && (
          <Typography className={classes.description}>{description}</Typography>
        )}
        <Typography className={classes.url}>{url}</Typography>
      </Box>
    </Button>
  );
};

export { LinkCard };
