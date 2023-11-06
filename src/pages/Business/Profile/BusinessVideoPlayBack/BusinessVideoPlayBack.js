import React, { useEffect } from "react";
import "./styles.scss";
import { Box } from "@mui/material";
import OutlineButton from "../../../../components/Buttons/Outline/OutlineButton";
import SIngleVideoPlayback from "../../../../components/videoComponent/SingleVideoPlayback/SIngleVideoPlayback";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function BusinessVideoPlayBack() {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  const { id } = useParams();
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
  const businessVideoData = useSelector(
    (state) => state.businessProfile.videosData
  );
  const filteredBusinessVideoData = businessVideoData.filter(
    (item) => item.assetId === id
  );

  console.log(filteredBusinessVideoData, "filteredBusinessVideoData");
  const location = useLocation();

  return (
    <div className="business-video-play-back">
      <Box className="play-back-main-container">
        <Box className="video-container">
          <SIngleVideoPlayback
            data={filteredBusinessVideoData[0]}
            businessData={businessData}
            index={1}
            currentIndex={1}
            key={1}
          />
        </Box>
        <Box className="button-box" onClick={backToHome}>
          <OutlineButton text="Go Back" />
        </Box>
      </Box>
    </div>
  );
}

export default BusinessVideoPlayBack;
