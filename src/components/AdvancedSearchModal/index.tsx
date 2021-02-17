import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import { BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Modal, AdvancedSearchForm } from "..";
import { useStyles } from "./styles";

type AdvancedSearchModalProps = {
  open?: boolean;
  onClose?: () => any;
};

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  open = true,
  onClose,
}) => {
  const classes = useStyles();

  const { replace } = useHistory();

  const goBack = () => replace("/explore");

  return (
    <Modal
      open={open}
      onClose={onClose || goBack}
      header={
        <React.Fragment>
          <IconButton onClick={onClose || goBack} color="primary">
            <BsX />
          </IconButton>
          <Typography
            variant="h2"
            component="h2"
            id="modal-title"
            className={classes.heading}
          >
            Advanced Search
          </Typography>
        </React.Fragment>
      }
      padding="0.5rem 1rem"
    >
      <AdvancedSearchForm />
    </Modal>
  );
};

export { AdvancedSearchModal };
