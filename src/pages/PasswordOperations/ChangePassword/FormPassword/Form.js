import React from "react";
import "./styles.scss";

import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import { ReactComponent as HiddenToggle } from "../../../../assets/admin/common/hidden.svg";
import { useNavigate } from "react-router-dom";

function FormPassword() {
  const navigate = useNavigate();
  return (
    <div className="form-password-page">
      <div className="page-content">
        <h1 className="title-heading">Change Password</h1>
        <h2 className="subheading">Choose your new password</h2>
        <div className="value-fields">
          <h3>New Password</h3>
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
            text="Continue"
            onClick={() => {
              navigate("/changepassword/confirmation");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FormPassword;
