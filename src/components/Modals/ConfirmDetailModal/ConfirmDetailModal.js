import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./styles.scss";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import { termsAndConditions } from "./TermsAndConditionsText";
import { Link } from "react-router-dom";

export default function ConfirmDetailModal(props) {
  const { openPopup, handleClose } = props;
  return (
    <Modal
      className="confirm-details-modal"
      open={openPopup}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <Typography id="modal-modal-title" className="titles2">
          We’re glad you’re here! 😎
        </Typography>
        <Typography id="modal-modal-description" className="subtitle2">
          Please review our updated Terms of Service
          <br />
          and Privacy Policy.
        </Typography>
        <Box className="terms-conditions-box">
          <Typography disabled className="modal-term-text">
            {termsAndConditions}
          </Typography>
        </Box>
        <Typography className="terms-conditions-text">
          By continuing you agree to our
          <Link href="#" className="terms-link-text">
            Terms of Service
          </Link>
          <br />
          and acknowledge our Privacy Policy.
        </Typography>
        <div className="submit-button-container">
          <PrimaryButton text="Accept & Continue" />
        </div>
        <Typography className="back-button-container">Back</Typography>
      </Box>
    </Modal>
  );
}
