import React, { useState } from "react";
import "./styles.scss";
import { TextField, Autocomplete } from "@mui/material";
import { OutlinedInput, InputLabel, MenuItem, Select } from "@mui/material";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "../../../../../components/Buttons/Primary/PrimaryButton";
import IconInput from "../../../../../components/InputFields/IconInput/IconInput";
import { useNavigate } from "react-router-dom";
import NormalSelect from "../../../../../components/InputFields/NormalSelect/NormalSelect";
import ReCAPTCHA from "react-google-recaptcha";

function AboutYourselfAsCreator() {
  const navigate = useNavigate();
  const names = [
    "Humaira Sims",
    "Santiago Solis",
    "Dawid Floyd",
    "Mateo Barlow",
    "Samia Navarro",
    "Kaden Fields",
    "Genevieve Watkins",
  ];
  const [selectedValue, setSelectedValue] = useState([]);
  const [placeholder, setPlaceholder] = useState("Select at least one");
  const menuItems = ["Yes", "No"];
//AutoComplet component Functions
  const handleSelectChange = (value) => {
    setSelectedValue(value);
    if (value.length === 0) {
        setPlaceholder("Select at least one");
      } else if (value.length === 1) {
        setPlaceholder("Select Other");
      } else {
        setPlaceholder("Select Multiple");
      }
  };
  
//   reCAPTCA codes
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
    <div className="about-yourself-page">
      <div className="add-details-content">
        <h1 className="title-heading">
          We’re happy you’re here!
          <br />
          Tell us about what you create.
        </h1>
        <h2 className="subheading">
          Already have an account? <span className="signin-link">signin</span>
        </h2>
        <div className="value-fields">
          <h3>What's your name?</h3>
          <IconInput
            className="input-field"
            type="text"
            placeholder="Enter name"
            required
          />
          <h3>What kind of content do you create?*</h3>
          <Autocomplete
            multiple
            options={names}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            value={selectedValue}
            onChange={(e, newValue) => handleSelectChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={placeholder}
              />
            )}
          />
          <h3>Do you create for others?*</h3>
          <NormalSelect
            onSelectChange={handleSelectChange}
            menuItems={menuItems}
            selectValue={selectedValue}
            placeholder="Enter here"
          />
        </div>
        <div className="recaptcha-container">
          <ReCAPTCHA
            className="recaptcha"
            sitekey="6Lf29BYoAAAAAFh5ZEHlPVk-28yAlYvIel-8FNQW"
            onChange={handleRecaptchaChange}
          />
        </div>
        <div className="button-container">
          <PrimaryButton
            styles={{ maxWidth: "250px", zIndex: 3 }}
            disabled
            text="Continue"
            onClick={() => {
              handleFormSubmit()
              navigate("/signup/socialaccountslinks");
            }}
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

export default AboutYourselfAsCreator;
