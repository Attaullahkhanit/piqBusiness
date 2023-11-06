import React from "react";
import "./styles.scss";
import { ReactComponent as LockIcon } from "../../../assets/business/authentication/verifyotp/Group 25893.svg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
export default function OTPExpired() {
  return (
    <div className="otp-expired-page">
      <div className="expired-container">
        <Box className="top-image-container" id="content-cards-container">
          <LockIcon />
        </Box>
        <Box className="title">
          <Typography className="text-verify-otp">OTP Expired</Typography>
          <Typography className="text-enter-code">Please try again.</Typography>
        </Box>
        <div className="submit-button-container">
          <PrimaryButton text="Resend" />
        </div>
        <div className="bottom-text">
          <Typography className="text">Need extra assistance?</Typography>
          <Link className="contact-link">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
