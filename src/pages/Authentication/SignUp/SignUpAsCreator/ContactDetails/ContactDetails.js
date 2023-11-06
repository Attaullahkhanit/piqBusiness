import React, { useState } from "react";
import "./styles.scss";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { ReactComponent as LocationMark } from "../../../../../assets/business/authentication/SignupProgress/SignupAsCreator/location-mark.svg";
import SecondaryButton from "../../../../../components/Buttons/Secondary/SecondaryButton";
import IconInput from "../../../../../components/InputFields/IconInput/IconInput";
import PrimaryButton from "../../../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
import PhoneNumberInput from "../../../../../components/PhoneNumber/PhoneNumberInput";

function ContactDetails() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(""); // State to store the phone number
        const handlePhoneNumberChange = (value) => {    
          setPhoneNumber(value);
        };
  return (
    <div className="contact-details-page">
      <div className="contact-container">
        <h1 className="title-heading">How can we contact you?</h1>
        <h2 className="subheading">
          {" "}
          Please enter the best way to reach you. 
        </h2>
        <div className="value-fields">
          <h3>What’s your email?*</h3>
          <div className="input-field">
            <IconInput type="text" placeholder="John@examplebusiness.com" />
          </div>
          <h3>What’s the best number to reach you at?*</h3>
          <div className="input-field-number">
            <div className="icon-input-container">
              <PhoneNumberInput
                placeholder="555-555-5555"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
          </div>
          <h3>Business Address</h3>
          <TextField
            type="text"
            placeholder="2345 N. Example Blvd."
            variant="outlined"
            fullWidth
            InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                <LocationMark />
                </InputAdornment>
            ),
            }}
            />
        </div>
        <div className="button-container">
          <PrimaryButton
            styles={{ maxWidth: "250px", zIndex: 3 }}
            text="Continue"
            onClick={() => {
              navigate("/signup/confirmationmessage");
            }}
          />
        </div>
        {/* CAPTCHA COMES HERE */}
        <h4>
          Questions?{" "}
          <span style={{ textDecoration: "underline", color: "#ffda46" }}>
            Chat with us.
          </span>
        </h4>
      </div>
    </div>
  );
}
export default ContactDetails;
