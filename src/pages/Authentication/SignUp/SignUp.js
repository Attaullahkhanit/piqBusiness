import React from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";

import { ReactComponent as VideoIcon } from "../../../assets/admin/SignUp/video.svg";
import { ReactComponent as ShopIcon } from "../../../assets/admin/SignUp/shop.svg";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="sign-up-as-business">
      <div className="sign-up-content">
        <h1 className="title-heading">Hello there! 👋</h1>
        <h2 className="subheading"> How would you like to apply? </h2>
        <div className="box-container">
          <Box className="box-left" onClick={()=>{navigate('/signup/business')}}>
            <ShopIcon className="box-icon"/>
            <Typography className="box-title">As a Business</Typography>
          </Box>
          <Box className="box-right">
            <VideoIcon className="box-icon"/>
            <Typography className="box-title">As a Creator</Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
