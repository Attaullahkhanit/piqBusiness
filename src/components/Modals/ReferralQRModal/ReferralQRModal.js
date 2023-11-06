import React from "react";
import "./styles.scss";
import { Box, Modal, Typography } from "@mui/material";
import { ReactComponent as CopyIcon } from "../../../assets/business/settings/copy.svg";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
export default function ReferralQRModal({ handleClose, open, qr, link }) {
  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = "data:image/png;base64," + qr;
    link.download = "image.png";
    link.click();
  };
  return (
    <Modal className="referral-qr-modal" open={open} onClose={handleClose}>
      <Box className="modal-content">
        <Box className="qr-code-container">
          <img
            src={"data:image/png;base64," + qr}
            alt="qr-code"
            className="qr-code"
          />
        </Box>
        <Box className="options-container">
          <Box className="link-option-container">
            <Typography className="link-option-text">Referral Link</Typography>
            <Box className="link-option-value">
              <Typography className="link-option-value-text">{link}</Typography>
              <CopyIcon
                className="copy-icon"
                onClick={() => {
                  navigator.clipboard.writeText(link);
                }}
              />
            </Box>
            <Typography className="or-text">Or</Typography>
          </Box>
          <Box className="button-container">
            <PrimaryButton
              styles={{ maxWidth: "280px" }}
              text="Download QR Code"
              onClick={handleDownloadImage}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
