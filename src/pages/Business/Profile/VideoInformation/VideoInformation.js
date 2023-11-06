import React from "react";
import "./styles.scss";
import { Box } from "@mui/material";

import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import { ReactComponent as Rocket } from "../../../../assets/business/navbar/performance.svg";
import { ReactComponent as ViewIcon } from "../../../../assets/business/common/view 1.svg";
import { ReactComponent as EditIcon } from "../../../../assets/business/common/edit.svg";
import { ReactComponent as VideoIcon } from "../../../../assets/business/common/video.svg";
import { ReactComponent as ShareIcon } from "../../../../assets/business/common/share.svg";
import { ReactComponent as SaveIcon } from "../../../../assets/business/common/save.svg";
import profilePlaceholder from "../../../../assets/admin/Profile/profilePicture.png";

import { useNavigate } from "react-router-dom";

function VideoInformation() {
  const navigate = useNavigate();
  return (
    <div className="performance-page">
      <div className="performance-content">
        <div className="box-container">
          <Box className="video-info">
            <div className="info-header">
              <h1 className="title">Blueberry Pancakes</h1>
              <div className="icons">
                <ViewIcon
                  onClick={() => {
                    navigate("/immersiveView");
                  }}
                />
                <EditIcon
                  onClick={() => {
                    navigate("/content/detail/:id");
                  }}
                />        
    </div>
            </div>
            <span className="content-wrapper">
              <img
                src={profilePlaceholder}
                alt="Profile"
                className="profile-placeholder-image"
              />
              <h2 className="subheading">Content by Jack Paul</h2>
            </span>
          </Box>

          <hr className="box-divider" />          <Box className="video-insights">
            <div className="insight-box">
              <div className="insight-content">
                <h3 className="insight-title">
                  <VideoIcon /> Views
                </h3>
                <p className="insight-number">1234</p>
              </div>
            </div>
            <div className="insight-box">
              <div className="insight-content">
                <h3 className="insight-title">
                  <ShareIcon /> Shares
                </h3>
                <p className="insight-number">567</p>
              </div>
            </div>
            <div className="insight-box">
              <div className="insight-content">
                <h3 className="insight-title">
                  <SaveIcon /> Saves
                </h3>
                <p className="insight-number">89</p>
              </div>
            </div>
          </Box>
        </div>

        <div className="box-container">
          <div className="box-content">
            <div className="box-icon">
              <Rocket />
            </div>
            <div className="text-container">
              <h1 className="title">Boost your visibility</h1>
              <h2 className="subheading">
                Show the world what you offer by promoting your content
              </h2>
              <div className="button-container">
                <PrimaryButton
                  styles={{ maxWidth: "435px", zIndex: 0 }}
                  text="Promote"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoInformation;
