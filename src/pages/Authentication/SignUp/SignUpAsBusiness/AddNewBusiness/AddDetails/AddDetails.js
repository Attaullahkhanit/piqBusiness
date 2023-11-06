import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";

import SecondaryButton from "../../../../../components/Buttons/Secondary/SecondaryButton";
import IconInput from "../../../../../components/InputFields/IconInput/IconInput";
import PrimaryButton from "../../../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";

function AddDetails() {
  const navigate = useNavigate();
  return (
    <div className="add-details-page">
      <div className="add-details-content">
        <h1 className="title-heading">Where can we find your business?</h1>
        <h2 className="subheading">
          {" "}
          Businesses who enter this information have a higher chance of being
          selected.
        </h2>
        <div className="value-fields">
          <h3>Address</h3>
          <IconInput type="text" placeholder="2345 N. Example Blvd." />
          <h3>Website</h3>
          <IconInput type="text" placeholder="examplebusiness.com" />
          <h3>Social Media</h3>
          <div className="input-field">
            <IconInput type="text" placeholder="@Instagram" />
          </div>
          <div className="input-field">
            <IconInput type="text" placeholder="@Tiktok" />
          </div>
        </div>
        <div className="button-container">
          <PrimaryButton
            styles={{ maxWidth: "250px", zIndex: 3 }}
            text="Continue"
            onClick={() => {
              navigate("/signup/business/about");
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

export default AddDetails;
