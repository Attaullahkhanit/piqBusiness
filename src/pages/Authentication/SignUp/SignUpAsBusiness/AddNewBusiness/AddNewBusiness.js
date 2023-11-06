import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
import IconInput from "../../../../../components/InputFields/IconInput/IconInput";
import PrimaryButton from "../../../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";

function AddNewBusiness() {
  const navigate= useNavigate()
  return (
    <div className="sign-up-as-business">
      <div className="sign-up-content">
        <h1 className="title-heading">
          We’re happy you’re here! <br /> Tell us about your business.
        </h1>
        <h2 className="subheading">
          Already have an account?{" "}
          <span onClick={() => {navigate('/signin')}}>
            Sign In
          </span>
        </h2>
        <div className="value-fields">
          <h3>What kind of business is this?</h3>
          <IconInput placeholder={"Enter Here"} />
          <h3>What does your business offer?</h3>
          <IconInput placeholder={"Enter Here"} />
        </div>
        <div className="button-container">
          <PrimaryButton
            styles={{ maxWidth: "280px", zIndex: 3 }}
            text="Continue"
            onClick={() => {navigate('/signup/business/links')}}
          />
        </div>
        {/* CAPTCHA COMES HERE */}
        <Typography className="form-bottom-text">
          Questions? <span className="form-bottom-text-span">Chat with us</span>
        </Typography>
      </div>
      </div>
  );
}

export default AddNewBusiness;
