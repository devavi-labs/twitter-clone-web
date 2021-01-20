import { Divider, IconButton } from "@material-ui/core";
import React from "react";
import { BsX } from "react-icons/bs";
import { useHistory, useLocation } from "react-router-dom";
import { CreateQuack, Modal, Quack } from "..";
import { RegularQuackFragment } from "../../generated/graphql";

export type CreateQuackModalState = {
  inReplyToQuack?: RegularQuackFragment;
};

interface CreateQuackModalProps {
  open?: boolean;
  onClose?: () => any;
}

export const CreateQuackModal: React.FC<CreateQuackModalProps> = ({
  open = true,
  onClose,
}) => {
  const { goBack } = useHistory();
  const { state } = useLocation<CreateQuackModalState>();

  return (
    <Modal
      open={open}
      onClose={onClose || goBack}
      header={
        <>
          <IconButton onClick={onClose || goBack} color="primary">
            <BsX />
          </IconButton>
        </>
      }
      top="4%"
    >
      <>
        <Divider />
        {state?.inReplyToQuack && (
          <Quack quack={state.inReplyToQuack} showBar variant="replying-to" />
        )}
        <CreateQuack
          bottomDivider={false}
          inReplyToQuackId={state?.inReplyToQuack?.id}
        />
      </>
    </Modal>
  );
};
