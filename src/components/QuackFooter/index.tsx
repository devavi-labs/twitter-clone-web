import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { QuackSharePopper } from "..";
import { FeedContext } from "../../context/feed";
import { ToastContext } from "../../context/toast";
import {
  RegularQuackFragment,
  useLikeMutation,
  useRequackMutation,
} from "../../generated/graphql";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePopper } from "../../hooks/usePopper";
import { EngageButton } from "../EngageButton";
import { useStyles } from "./styles";

export type QuackFooterProps = {
  quack: RegularQuackFragment;
  variant?: "contained" | "open" | "reply" | "replying-to";
};

const QuackFooter: React.FC<QuackFooterProps> = ({ quack, variant }) => {
  const { xs } = useMediaQuery();

  const classes = useStyles({ variant, xs });

  const { handleOpen: toast } = React.useContext(ToastContext)!;

  const [{ fetching: likeLoading }, like] = useLikeMutation();
  const [{ fetching: requackLoading }, requack] = useRequackMutation();

  const handleLike = async () => {
    const { error } = await like({ quackId: quack?.id });
    if (error) {
      toast("Couldn't like the quack");
    }
  };

  const handleRequack = async () => {
    const { error } = await requack({ quackId: quack?.id });
    if (error) {
      toast("Couldn't requack the quack");
    }
  };

  const { open, handleClick, anchorEl, onClose } = usePopper();

  const { state } = React.useContext(FeedContext)!;
  const history = useHistory();

  const onReply = () =>
    history.push("/compose/quack", {
      popup: "compose-quack",
      feed: state?.feed,
      username: state?.username,
      tab: state?.tab,
      inReplyToQuack: quack,
    });

  return (
    <Box className={classes.root}>
      <EngageButton
        type="reply"
        engagements={quack?.replies?.length || 0}
        size={variant === "open" ? "md" : "sm"}
        onClick={onReply}
      />
      <EngageButton
        type="requack"
        engagements={quack?.requacks || 0}
        status={quack?.requackStatus || false}
        size={variant === "open" ? "md" : "sm"}
        onClick={handleRequack}
        loading={requackLoading}
      />
      <EngageButton
        type="like"
        engagements={quack?.likes || 0}
        status={quack?.likeStatus || false}
        size={variant === "open" ? "md" : "sm"}
        onClick={handleLike}
        loading={likeLoading}
      />
      <EngageButton
        type="share"
        size={variant === "open" ? "md" : "sm"}
        onClick={handleClick}
      />
      <QuackSharePopper
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        quack={quack}
      />
    </Box>
  );
};

export { QuackFooter };
