import React from "react";
import "./styles.scss"; // Import the new SCSS file
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import OutlineButton from "../Buttons/Outline/OutlineButton";
import piqLogo from "../../assets/admin/common/piqLogo.png";
import PrimaryButton from "../Buttons/Primary/PrimaryButton";

function BaseNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className="base-navbar">
      <Box className="left-area">
        <Box className="logo-area">
          <img src={piqLogo} alt="logo" />
        </Box>
      </Box>
      <Box className="right-area">
        {location.pathname.includes("/signin") ? (
          <PrimaryButton
            className="sign-in-button"
            text="Sign Up" // Specify the text prop
            height="60px" // Specify the height prop as needed
            onClick={() => {
              // Handle sign-in logic here
              navigate("/signup"); // Replace with your sign-in route
            }}
          />
        ) : (
          <OutlineButton
            className="sign-in-button"
            text="Sign In" // Specify the text prop
            height="60px" // Specify the height prop as needed
            onClick={() => {
              // Handle sign-in logic here
              navigate("/signin"); // Replace with your sign-in route
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default BaseNavbar;
