import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { AccountPopper, DisplayName, RoundedButton } from "..";
import { useMeQuery } from "../../generated/graphql";
import { useMediaQuery, usePopper } from "../../hooks";
import { useStyles } from "./styles";

export const AccountButton = () => {
  const { open, anchorEl, handleClick, onClose } = usePopper();

  const { md } = useMediaQuery();

  const [{ data }] = useMeQuery();

  const classes = useStyles();

  if (md) {
    return (
      <>
        <IconButton onClick={handleClick} size="small">
          <Avatar className={classes.avatar} src={data?.me?.displayPicture} />
        </IconButton>
        <AccountPopper open={open} anchorEl={anchorEl} onClose={onClose} />
      </>
    );
  }

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
          <DisplayName
            displayName={data?.me?.displayName}
            username={data?.me?.username}
            verified={data?.me?.isVerified}
            direction="vertical"
            link={false}
          />
        </div>
        <BsThreeDots className={classes.dots} />
      </RoundedButton>
      <AccountPopper open={open} anchorEl={anchorEl} onClose={onClose} />
    </>
  );
};
