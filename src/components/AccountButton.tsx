import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { AccountPopper, RoundedButton } from ".";
import { useMeQuery } from "../generated/graphql";
import { usePopper } from "../hooks/usePopper";
import { hexToRgb } from "../utils/hexToRgb";

export const AccountButton = () => {
  const { open, anchorEl, handleClick, onClose } = usePopper();

  const [{ data }] = useMeQuery();
  const useStyles = makeStyles(({ palette: { primary, text, type } }) => ({
    accountButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "&:hover": {
        background: hexToRgb(primary.main, 0.1),
        color: primary.main + " !important",
      },
      "&:focus": {
        background: hexToRgb(primary.main, 0.1),
        color: primary.main + " !important",
      },
    },
    body: { display: "flex", alignItems: "center" },
    avatar: { marginRight: "0.4em", height: "3rem", width: "3rem" },
    displayName: {
      color: text.primary,
      fontWeight: "bold",
      opacity: type === "dark" ? 0.8 : 1,
    },
    handle: {
      color: text.primary,
      opacity: 0.6,
      fontSize: "0.9rem",
    },
    dots: {
      color: text.primary,
      fontSize: "1.5rem",
      opacity: type === "dark" ? 0.8 : 1,
    },
  }));
  const classes = useStyles();
  return (
    <>
      <RoundedButton
        className={classes.accountButton}
        fullWidth
        disableRipple
        onClick={handleClick}
      >
        <div className={classes.body}>
          <Avatar className={classes.avatar} src={data?.me?.displayPicture} />
          <div>
            <Typography className={classes.displayName}>
              {data?.me?.displayName}
            </Typography>
            <Typography className={classes.handle}>
              @{data?.me?.username}
            </Typography>
          </div>
        </div>
        <BsThreeDots className={classes.dots} />
      </RoundedButton>
      <AccountPopper open={open} anchorEl={anchorEl} onClose={onClose} />
    </>
  );
};
