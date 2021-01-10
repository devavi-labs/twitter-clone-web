import { Box, IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsBoxArrowUp, BsChat, BsHeartFill, BsHeart } from "react-icons/bs";
import {} from ".";
import { RequackColor, LikeColor } from "../theme";
import { hexToRgb } from "../utils/hexToRgb";
import numeral from "numeral";

interface EngageButtonProps {
  type: "reply" | "requack" | "like" | "share";
  engagements?: number;
  status?: boolean;
  size?: "sm" | "md";
}

export const EngageButton: React.FC<
  EngageButtonProps & Pick<IconButtonProps, "onClick">
> = ({ type, engagements = -1, status, size = "sm", onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const color =
    type === "requack" ? RequackColor : type === "like" ? LikeColor : undefined;

  let Icon = BsChat;

  switch (type) {
    case "reply":
      Icon = BsChat;
      break;
    case "requack":
      Icon = AiOutlineRetweet;
      break;
    case "like":
      Icon = status ? BsHeartFill : BsHeart;
      break;
    case "share":
      Icon = BsBoxArrowUp;
      break;
    default:
      Icon = BsChat;
  }

  const useStyles = makeStyles(({ palette: { primary, text } }) => ({
    root: {
      fontSize: "0.8rem",
      color: (hovered || focused) && color ? color : text.primary,
    },
    button: {
      width: size === "sm" ? 32 : 34,
      height: size === "sm" ? 32 : 34,
      padding: 8,
      "&:hover": {
        background: hexToRgb(color || primary.main, 0.1),
        color: color || primary.main + " !important",
      },
      "&:focus": {
        background: hexToRgb(color || primary.main, 0.1),
        color: color || primary.main + " !important",
      },
    },
    icon: {
      color: status && color ? color : "inherit",
    },
  }));
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <IconButton
        className={classes.button}
        disableRipple
        onClick={onClick}
        onMouseOver={() => setHovered(true)}
        onMouseDown={() => setFocused(true)}
        onMouseLeave={() => setHovered(false)}
        onBlur={() => setFocused(false)}
      >
        <Icon className={classes.icon} />
      </IconButton>
      {engagements > 0 &&
        numeral(engagements).format(engagements > 1000 ? "0.0a" : "0 a")}
    </Box>
  );
};