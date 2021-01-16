import { Divider, IconButton } from "@material-ui/core";
import React from "react";
import { BsX } from "react-icons/bs";
import { Modal, Quack } from ".";
import { RegularQuackFragment } from "../generated/graphql";
import { CreateQuack } from "./CreateQuack";

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
          <IconButton onClick={onClose}>
            <BsX />
          </IconButton>
        </>
      }
      top="4%"
    >
      <>
        <Divider />
        {inReplyToQuack && (
          <Quack
            quack={inReplyToQuack}
            showBar="bottom"
            variant="replying-to"
          />
        )}
        <CreateQuack
          bottomDivider={false}
          inReplyToQuackId={inReplyToQuack?.id}
        />
      </>
    </Modal>
  );
};
