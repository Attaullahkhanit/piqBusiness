import React from "react";
import "./styles.scss";
import Checkmark from "../../../../assets/admin/SignUp/check-mark.png";
import BusinessFooter from "../../../../components/footer/BusinessFooter";

function RequestSubmitted() {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="check-mark">
          <img src={Checkmark} alt="Checkmark" className="checkmark-image" />
        </div>
        <h1 className="title-heading">Request Submitted.</h1>
      </div>
      <BusinessFooter pathname="/support/requestsubmitted" routesToHideUserStatus={["/requestsubmitted"]} />
    </div>
  );
}

export default RequestSubmitted;
