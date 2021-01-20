import { useState } from "react";
import { useConfirmDialog, useToast } from ".";
import {
  RegularUserFragment,
  useBlockMutation,
  useUnblockMutation,
} from "../generated/graphql";

export const useConditionalBlock = (): [
  (user: RegularUserFragment | null) => Promise<void>,
  boolean
] => {
  const [, block] = useBlockMutation();
  const [, unblock] = useUnblockMutation();

  const [fetching, setFetching] = useState(false);

  const [, { handleOpen: handleToastOpen }] = useToast();
  const [, { handleOpen: handleDialogOpen }] = useConfirmDialog();

  const _handleBlock = async (user: RegularUserFragment | null) => {
    setFetching(true);

    const { data, error } = await block({ userId: user!.id });

    if (data?.block) {
      handleToastOpen(`Blocked @${user?.username}`);
    } else {
      handleToastOpen(`Couldn't block @${user?.username}`);
    }

    if (error) {
      handleToastOpen(`Couldn't block @${user?.username}`);
    }

    setFetching(false);
  };

  const _handleUnblock = async (user: RegularUserFragment | null) => {
    setFetching(true);

    const { data, error } = await unblock({ userId: user!.id });

    if (data?.unblock) {
      handleToastOpen(`Unblocked @${user?.username}`);
    } else {
      handleToastOpen(`Couldn't unblock @${user?.username}`);
    }

    if (error) {
      handleToastOpen(`Couldn't unblock @${user?.username}`);
    }

    setFetching(false);
  };

  const handleConditionalBlock = async (user: RegularUserFragment | null) => {
    if (user?.haveIBlockedThisUser !== null) {
      if (user?.haveIBlockedThisUser) {
        handleDialogOpen({
          title: `Unblock @${user?.username}?`,
          content: `They will be able to follow you and view your Quacks. `,
          confirmLabel: "Unblock",
          onConfirm: () => _handleUnblock(user),
        });
      } else {
        handleDialogOpen({
          title: `Block @${user?.username}?`,
          content: `They will not be able to follow you or view your Quacks, 
          and you will not see Quacks from @${user?.username}`,
          confirmLabel: "Block",
          onConfirm: () => _handleBlock(user),
        });
      }
    }
  };

  return [handleConditionalBlock, fetching];
};
