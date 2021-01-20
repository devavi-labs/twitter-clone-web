import { useState } from "react";
import { useConfirmDialog, useToast } from ".";
import {
  RegularUserFragment,
  useFollowMutation,
  useUnfollowMutation,
} from "../generated/graphql";

export const useConditionalFollow = (): [
  (user: RegularUserFragment | null) => Promise<void>,
  boolean
] => {
  const [, follow] = useFollowMutation();
  const [, unfollow] = useUnfollowMutation();

  const [fetching, setFetching] = useState(false);

  const [, { handleOpen: handleToastOpen }] = useToast();
  const [, { handleOpen: handleDialogOpen }] = useConfirmDialog();

  const _handleFollow = async (user: RegularUserFragment | null) => {
    setFetching(true);

    const { data, error } = await follow({ userId: user!.id });

    if (data?.follow) {
      handleToastOpen(`Followed @${user?.username}`);
    } else {
      handleToastOpen(`Couldn't follow @${user?.username}`);
    }

    if (error) {
      handleToastOpen(`Couldn't follow @${user?.username}`);
    }

    setFetching(false);
  };

  const _handleUnfollow = async (user: RegularUserFragment | null) => {
    setFetching(true);

    const { data, error } = await unfollow({ userId: user!.id });

    if (data?.unfollow) {
      handleToastOpen(`Unfollowed @${user?.username}`);
    } else {
      handleToastOpen(`Couldn't unfollow @${user?.username}`);
    }

    if (error) {
      handleToastOpen(`Couldn't unfollow @${user?.username}`);
    }

    setFetching(false);
  };

  const handleConditionalFollow = async (user: RegularUserFragment | null) => {
    if (user?.followStatus !== null) {
      if (user?.followStatus) {
        handleDialogOpen({
          title: `Unfollow @${user?.username}?`,
          content: `Their Quacks will no longer show up in your home timeline. 
          You can still view their profile,
          unless their Quacks are protected.`,
          danger: false,
          confirmLabel: "Unfollow",
          onConfirm: () => _handleUnfollow(user),
        });
      } else await _handleFollow(user);
    }
  };

  return [handleConditionalFollow, fetching];
};
