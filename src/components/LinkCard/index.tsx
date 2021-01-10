import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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
  const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      borderRadius: "0.6rem",
      padding: 0,
      textTransform: "none",
      textAlign: "left",
      marginBottom: "0.4rem",
    },
    right: {
      flex: 2.8,
    },
    cardImage: {
      overflow: "hidden",
      height: 0,
      paddingTop: "100%",
      background: `url(${image})`,
      backgroundSize: "contain",
      borderTopLeftRadius: "0.6rem",
      borderBottomLeftRadius: "0.6rem",
    },
    content: {
      flex: 8,
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
