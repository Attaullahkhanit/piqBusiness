import React, { useState } from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
import { ReactComponent as EnvelopeIcon } from "../../../assets/admin/password/envelope.svg";
import { ReactComponent as CommentIcon } from "../../../assets/admin/password/comment-dots.svg";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";

function ChangePassword() {
  const navigate = useNavigate();
  const [selectedBox, setSelectedBox] = useState(null);
  const handleBoxClick = (boxName) => {
    setSelectedBox(boxName);
  };

  return (
    <div className="change-password-container">
      <div className="change-password-content">
        <h1 className="title-heading">Change Password</h1>
        <h2 className="subheading">Where should we send your one-time password?</h2>
        <div className="box-container">
          <Box
            className={`box-left ${
              selectedBox === "email" ? "selected" : ""
            }`}
            onClick={() => handleBoxClick("email")}
          >
            <EnvelopeIcon className="box-icon" />
            <Typography className="box-title">Email Me</Typography>
          </Box>
          <Box
            className={`box-right ${
              selectedBox === "text" ? "selected" : ""
            }`}
            onClick={() => handleBoxClick("text")}
          >
            <CommentIcon className="box-icon" />
            <Typography className="box-title">Text Me</Typography>
          </Box>
        </div>
        <div className="button-container">
          <PrimaryButton styles={{ maxWidth: "280px", zIndex: 3 }} text="Send OTP" />
        </div>
        <Typography className="form-bottom-text">
          Don’t have access to either?{" "}
          <div className="form-bottom-text-span">Connect with our support team</div>
        </Typography>
      </div>
    </div>
  );
}

export default ChangePassword;
