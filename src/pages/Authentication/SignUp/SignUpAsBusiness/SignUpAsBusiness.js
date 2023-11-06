import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";

import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import { useNavigate } from "react-router-dom";

import { ReactComponent as HiddenToggle } from "../../../../assets/admin/common/hidden.svg";

function SignUpAsBusiness() {
  const navigate = useNavigate();
  return (
    <div className="signup-page">
      <div className="signup-content">
        <h1 className="title-heading">Sign Up</h1>
        <h2 className="subheading">
          Already have an account?{" "}
          <span onClick={() => {navigate('/signin')}}>
            Sign In
          </span>
        </h2>
        <div className="value-fields">
          <h3>Name</h3>
          <IconInput
            className="input-field"
            type="text"
            placeholder="Enter Here"
            required
          />
          <h3>Email</h3>
          <IconInput
            className="input-field"
            type="email"
            placeholder="Enter Here"
            required
          />
          <h3>Password</h3>
          <IconInput
            className="input-field"
            position="right" // Set position to "right"
            type="password"
            placeholder="Enter here"
            required
            icon={<HiddenToggle />} 
          />
          <h3>Confirm Password</h3>
          <IconInput
            className="input-field"
            position="right" 
            placeholder="Enter here"
            required
            icon={<HiddenToggle />} 
          />
        </div>
        <div className="button-container">
          <PrimaryButton
            styles={{ maxWidth: "250px", zIndex: 3 }}
            text="Sign Up"
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

export default SignUpAsBusiness;
