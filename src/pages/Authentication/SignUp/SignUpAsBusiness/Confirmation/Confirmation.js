import React from "react";
import "./styles.scss";
import Checkmark from "../../../../../assets/admin/SignUp/check-mark.png";

function Confirmation() {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="check-mark">
          <img src={Checkmark} alt="Checkmark" className="checkmark-image" />
        </div>
        <h1 className="title-heading">Application Recieved.</h1>
        <h2 className="subheading">
          Our team will contact you shortly can’t wait?
          <div
            style={{
              textDecoration: "underline",
              color: "#ffda46",
              textalign: "center",
            }}
          >
            Chat with us.
          </div>{" "}
        </h2>
      </div>
    </div>
  );
}

export default Confirmation;
