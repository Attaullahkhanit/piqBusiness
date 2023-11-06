import React, { useState } from "react";
import "./styles.scss";
import { ReactComponent as LockIcon } from "../../../assets/business/authentication/verifyotp/Group 25893.svg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const handleChange = (newOtp) => {
    setOtp(newOtp);
  };
  return (
    <div className="verify-otp-page">
      <div className="verify-container">
        <Box className="top-image-container" id="content-cards-container">
          <LockIcon />
        </Box>
        <Box className="title">
          <Typography className="text-verify-otp">Verify OTP</Typography>
          <Typography className="text-enter-code">
            Enter the code we just send you.
          </Typography>
        </Box>
        <Box className="number-input-field">
          <MuiOtpInput
            TextFieldsProps={{ placeholder: "-" }}
            length={5}
            value={otp}
            itemType="number"
            onChange={handleChange}
          />
        </Box>
        <Box className="number-expires">
          <Typography className="expires">
            Expires <span className="time">20 secs</span>
          </Typography>
        </Box>
        <div className="submit-button-container">
          <PrimaryButton text="Verify" />
        </div>
        <div className="bottom-text">
          <Typography className="text">Need extra assistance?</Typography>
          <Link className="contact-link">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
