import React from "react";
import "./styles.scss";
import Checkmark from "../../../assets/admin/SignUp/check-mark.png";

function ConfirmForm() {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="check-mark">
          <img src={Checkmark} alt="Checkmark" className="checkmark-image" />
        </div>
        <h1 className="title-heading">Password Changed</h1>
      </div>
    </div>
  );
}

export default ConfirmForm;
