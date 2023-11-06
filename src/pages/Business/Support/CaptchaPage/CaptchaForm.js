import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import BusinessFooter from "../../../../components/footer/BusinessFooter";

import ReCAPTCHA from "react-google-recaptcha";

function CaptchaForm() {
    const navigate = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const handleRecaptchaChange = (value) => {
      setRecaptchaValue(value);
    };
    const handleFormSubmit = () => {
      if (recaptchaValue) {
        console.log("Form submitted with reCAPTCHA:", recaptchaValue);
      } else {
        alert("Please complete the reCAPTCHA.");
      }
    };
  return (
    <div className="captcha-page">
      <div className="captcha-content">
        <h1 className="title-heading">Help us fight spam</h1>
        <h2 className="subheading">Please verify that you are human.</h2>

        <div className="recaptcha-container">
          <ReCAPTCHA
            className="recaptcha"
            sitekey="6Lf29BYoAAAAAFh5ZEHlPVk-28yAlYvIel-8FNQW"
            onChange={handleRecaptchaChange}
          />
        </div>

        <div className="button-container">
        <PrimaryButton
              styles={{ maxWidth: "280px", zIndex: 3 }}
              text="Submit"
              onClick={() => {
                navigate("/support/requestsubmitted");
              }}
         />
         </div>

      <BusinessFooter pathname="/captcha" routesToHideUserStatus={["/requestsubmitted"]} />
      </div>

    </div>

    
  );
}

export default CaptchaForm;
