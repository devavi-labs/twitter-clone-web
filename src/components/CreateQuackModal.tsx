import { Divider, IconButton } from "@material-ui/core";
import React from "react";
import { BsX } from "react-icons/bs";
import { Modal } from ".";
import { CreateQuack } from "./CreateQuack";

interface CreateQuackModalProps {
  open: boolean;
  onClose: () => any;
}

export const CreateQuackModal: React.FC<CreateQuackModalProps> = ({
  open,
  onClose,
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
        <CreateQuack bottomDivider={false} rows={4} />
      </>
    </Modal>
  );
};
