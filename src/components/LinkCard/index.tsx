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
      borderRadius: "0.6rem",
      padding: 0,
      marginBottom: "0.4rem",
    },
    innerRoot: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      textAlign: "left",
      textTransform: "none",
    },
    right: {
      flex: 8,
      width: "100%",
    },
    cardImage: {
      maxHeight: 260,
      width: "100%",
      objectFit: "cover",
      borderTopLeftRadius: "0.6rem",
      borderTopRightRadius: "0.6rem",
    },
    content: {
      flex: 2,
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
          <img src={image} alt={title || ""} className={classes.cardImage} />
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
