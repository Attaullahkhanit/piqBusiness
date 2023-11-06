import { Grid, Typography } from "@mui/material";
import "./styles.scss";
import React, { useState } from "react";
import { ReactComponent as CommentDots } from "../../../assets/passwordOperations/forgotPassword/comment-dots.svg";
import { ReactComponent as Envelope } from "../../../assets/passwordOperations/forgotPassword/envelope (9).svg";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import PhoneNumberInput from "../../../components/PhoneNumber/PhoneNumberInput";
import ReCAPTCHA from "react-google-recaptcha";

function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [selectedOption, setSelectedOption] = useState("text");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleFormSubmit = () => {
    if (recaptchaValue) {
      console.log("Form submitted with reCAPTCHA:", recaptchaValue);
      if (selectedOption === "text") {
        console.log("Phone Number:", phoneNumber);
      } else if (selectedOption === "email") {
        console.log("Email:", email);
      }
    } else {
      alert("Please complete the reCAPTCHA.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <Typography className="title"> Forgot Password </Typography>
        <Typography className="subtitle">
          Where should we send your One-Time password?
        </Typography>
        <div className="form-container">
          <Grid item xs={12} className="top-buttons-container">
            <div>
              <button
                className={`text-me-button ${
                  selectedOption === "text" ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("text")}
              >
                <Typography className="text-me">
                  <div className="icon">
                    <CommentDots />
                  </div>
                  <div>Text me</div>
                </Typography>
              </button>
            </div>
            <div>
              <button
                className={`email-me-button ${
                  selectedOption === "email" ? "selected" : ""
                }`}
                onClick={() => handleOptionChange("email")}
              >
                <Typography className="email-me">
                  <div className={`icon ${selectedOption === "email" ? "colored-icon" : ""}`}>
                    <Envelope />
                  </div>
                  <div>Email me</div>
                </Typography>
              </button>
            </div>
          </Grid>
        </div>
        {selectedOption === "text" && (
          <div className="form-container">
            <Grid item xs={12} className="form-subcontainer">
              <Typography className="form-label">Phone Number</Typography>
              <div className="icon-input-container">
                <PhoneNumberInput
                  placeholder="555-555-5555"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
            </Grid>
          </div>
        )}
        {selectedOption === "email" && (
          <div className="form-container">
            <Grid item xs={12} className="form-subcontainer">
              <Typography className="form-label">Email</Typography>
              <div className="icon-input-container">
              </div>
            </Grid>
          </div>
        )}
        <div className="recaptcha-container">
          <ReCAPTCHA
            className="recaptcha"
            sitekey="6Lf29BYoAAAAAFh5ZEHlPVk-28yAlYvIel-8FNQW"
            onChange={handleRecaptchaChange}
          />
        </div>
        <div className="submit-button-container">
          <PrimaryButton
            disabled={!recaptchaValue}
            text="Send OTP"
            onClick={handleFormSubmit}
          />
        </div>
        <Typography className="form-bottom-text">Need extra assistance?</Typography>
        <Typography className="form-bottom-text-span">Contact us</Typography>
      </div>
    </div>
  );
}

export default ForgotPassword;
