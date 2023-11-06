import React, { useState } from "react";
import "./styles.scss";
import PhoneInput from "react-phone-number-input";

function PhoneNumberInput({ placeholder, value, onChange }) {
  return (
    <PhoneInput
      defaultCountry="US"
      international
      withCountryCallingCode
      placeholder={placeholder}
      type="tel"
      value={value}
      onChange={onChange}
    />
  );
}

export default PhoneNumberInput;
