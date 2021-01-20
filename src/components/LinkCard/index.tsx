import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

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
