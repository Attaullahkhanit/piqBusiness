import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";

import PrimaryButton from "../../../../../components/Buttons/Primary/PrimaryButton";
import IconInput from "../../../../../components/InputFields/IconInput/IconInput";
import { useNavigate } from "react-router-dom";

function AboutYourself() {
  const navigate = useNavigate();
  return (
    <div className="about-yourself-page">
      <div className="add-details-content">
        <h1 className="title-heading">Tell us about yourself.</h1>
        <h2 className="subheading">
          To whom do we have the pleasure of meeting?
        </h2>
        <div className="value-fields">
          <h3>What's your name?</h3>
          <IconInput
            className="input-field"
            type="text"
            placeholder="John Doe"
            required
          />
          <h3>What's your role in this business?</h3>
          <IconInput
            className="input-field"
            type="text"
            placeholder="Specify your designation"
            required
          />
          <h3>What's your business email?</h3>
          <IconInput
            className="input-field"
            type="email"
            placeholder="example@business.com"
            required
          />
          <h3>What's the best number to reach you at?</h3>
          <IconInput
            className="input-field"
            type="tel" // Use type "tel" for a telephone number input
            pattern="[0-9]{9}" // Use a pattern to specify the desired format (e.g., 123456789)
            placeholder="123456789" // Set the placeholder text
            required
          />
        </div>
        <div className="button-container">
          <PrimaryButton
            styles={{ maxWidth: "250px", zIndex: 3 }}
            text="Continue"
            onClick={() => {
              navigate("/signup/business/confirmation");
            }}
          />
        </div>
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

export default AboutYourself;
