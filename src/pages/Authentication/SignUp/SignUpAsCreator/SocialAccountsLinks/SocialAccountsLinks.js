import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";

import SecondaryButton from "../../../../../components/Buttons/Secondary/SecondaryButton";
import IconInput from "../../../../../components/InputFields/IconInput/IconInput";
import PrimaryButton from "../../../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";

function SocialAccountsLinks() {
  const navigate = useNavigate();
  return (
    <div className="social-accounts-links-page">
      <div className="links-container">
        <h1 className="title-heading">Where can we find you?</h1>
        <h2 className="subheading">
          {" "}
          Creators who enter this information have a higher<br/>
          chance of being selected.
        </h2>
        <div className="value-fields">
          <h3>Social Media</h3>
          <div className="input-field">
            <IconInput type="text" placeholder="@Instagram" />
          </div>
          <div className="input-field">
            <IconInput type="text" placeholder="@Tiktok" />
          </div>
          <div className="input-field">
            <IconInput type="text" placeholder="@Youtube" />
          </div>
          <div className="input-field">
            <IconInput type="text" placeholder="@Facebook" />
          </div>
          <h3>Website</h3>
          <IconInput type="text" placeholder="examplebusiness.com" />
        </div>
        <div className="button-container">
          <PrimaryButton
            styles={{ maxWidth: "250px", zIndex: 3 }}
            text="Continue"
            onClick={() => {
              navigate("/signup/contactdetails");
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

export default SocialAccountsLinks;
