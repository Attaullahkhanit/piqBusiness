import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UploadSuccessful() {
  const videoData = useSelector((state) => state.profileData.videoContent);
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToAllVideosPage = () => {
    if (videoData.length < 6) {
      navigate("/video/all");
    } else {
      navigate("/business"); //to be changed here
    }
  };

  useEffect(() => {
    setTimeout(() => {
      navigateToAllVideosPage();
    }, 1000);
  }, []);
  return (
    <div className="upload-successful-component">
      <Typography className="title">Uploaded Successfully</Typography>
    </div>
  );
}
