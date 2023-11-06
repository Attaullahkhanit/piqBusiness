import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import DangerButton from "../../Buttons/Danger/DangerButton";
import SecondaryButton from "../../Buttons/Secondary/SecondaryButton";

import { ReactComponent as TrashIcon } from "../../../assets/business/video/trash.svg";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

export default function RemoveBackgroundModal(props) {
  const { open, onClose, onConfirmRemove } = props;

  const navigate = useNavigate();
  return (
    <Modal
      className="remove-background-modal"
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <TrashIcon className="trash-icon"/>
        <Typography id="modal-modal-title" className="title">
          Remove Background Image
        </Typography>
        <Typography variant="subtitle1" className="subheading">
          Are you sure you want to remove the background image?
        </Typography>
        <Box className="options-container">
          <div className="remove-option">
            <Typography className="remove-option-text">
              <SecondaryButton
                className="custom-outline-button"
                text="Back"
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </SecondaryButton>
            </Typography>
          </div>
          <div className="remove-option">
            <Typography className="remove-option-text">
              <DangerButton
                className="custom-primary-button"
                text="Remove"
                onClick={() => {
                  onConfirmRemove();
                  onClose();
                }}
              >
                Remove
              </DangerButton>
            </Typography>
          </div>
        </Box>
      </Box>
    </Modal>
  );
}
