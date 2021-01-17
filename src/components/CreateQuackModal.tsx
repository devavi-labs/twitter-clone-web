import { Divider, IconButton } from "@material-ui/core";
import React from "react";
import { BsX } from "react-icons/bs";
import { Modal, Quack, CreateQuack } from ".";
import { RegularQuackFragment } from "../generated/graphql";

interface CreateQuackModalProps {
  open: boolean;
  onClose: () => any;
  inReplyToQuack?: RegularQuackFragment;
}

export const CreateQuackModal: React.FC<CreateQuackModalProps> = ({
  open,
  onClose,
  inReplyToQuack,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      header={
        <>
          <IconButton onClick={onClose} color="primary">
            <BsX />
          </IconButton>
        </>
      }
      top="4%"
    >
      <>
        <Divider />
        {inReplyToQuack && (
          <Quack quack={inReplyToQuack} showBar variant="replying-to" />
        )}
        <CreateQuack
          bottomDivider={false}
          inReplyToQuackId={inReplyToQuack?.id}
        />
      </>
    </Modal>
  );
};
