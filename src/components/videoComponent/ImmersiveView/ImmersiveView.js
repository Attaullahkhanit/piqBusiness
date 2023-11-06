import { Box, Typography } from "@mui/material";
import React from "react";
import "./styles.scss";
import {
  BusinessIconColored,
  CrossIconWhite,
  MenuDotsWhite,
  MusicIconWhite,
  VisitorIconColored,
} from "../../../assets/business/video";
import ProfilePlaceholder from "../../../assets/business/home/profilePlaceholder.png";
import ReactPlayer from "react-player";
import { ArrowLeft, ArrowRight, KeyboardArrowDown } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ImmersiveView() {
  const [selectedVideoIndex, setSelectedVideoIndex] = React.useState(0);
  const [videoCreatorType, setVideoCreatorType] = React.useState("business"); //['business','visitor'
  const videosData = useSelector((state) => state.businessProfile.videosData);
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
  const navigate = useNavigate();

  //Functions
  const moveLeft = () => {
    const container = document.getElementById("carousel-container");
    container.scrollBy({ left: -100, behavior: "smooth" });
    setSelectedVideoIndex(
      selectedVideoIndex - 1 > 0 ? selectedVideoIndex - 1 : 0
    );
  };
  const moveRight = () => {
    const container = document.getElementById("carousel-container");
    container.scrollBy({ left: 100, behavior: "smooth" });
    setSelectedVideoIndex(
      selectedVideoIndex + 1 < videosData?.length
        ? selectedVideoIndex + 1
        : videosData?.length - 1
    );
  };
  const showHideCarousel = () => {
    const carouselContainer = document.getElementById("carousel-area");
    if (carouselContainer.style.display === "none") {
      carouselContainer.style.display = "flex";
    } else {
      carouselContainer.style.display = "none";
    }
  };
  const handleChangeCreatorType = () => {
    if (videoCreatorType === "business") {
      setVideoCreatorType("visitor");
    } else {
      setVideoCreatorType("business");
    }
  };

  //utils
  const getCarouselImageSize = (index) => {
    if (index === selectedVideoIndex) {
      return "large";
    } else if (
      index === selectedVideoIndex - 1 ||
      index === selectedVideoIndex + 1
    ) {
      return "medium";
    } else {
      return "small";
    }
  };

  const VideoCreatorTag = () => {
    if (videoCreatorType === "business") {
      return (
        <div className="status-container" onClick={handleChangeCreatorType}>
          <BusinessIconColored />
          <Typography className="status-text">From Business</Typography>
        </div>
      );
    } else {
      return (
        <div className="status-container" onClick={handleChangeCreatorType}>
          <VisitorIconColored />
          <Typography className="status-text">From Visitors</Typography>
        </div>
      );
    }
  };
  return (
    <div className="immersive-view-component">
      <div className="top-area">
        <div className="top-left-area">
          <div className="image-container">
            <img
              src={businessData?.businessImageUrl || ProfilePlaceholder}
              alt="profile"
            />
          </div>
          <div className="title-container">
            <Typography className="title">
              {businessData?.businessName}
            </Typography>
            <Typography className="creator">
              by Jacqueline Paulina Foster
            </Typography>
            <div className="music-container">
              <MusicIconWhite />
              <Typography className="creator">All About That Bass</Typography>
            </div>
          </div>
        </div>
        <div className="top-right-area">
          <div className="icon-container">
            <MenuDotsWhite />
            <CrossIconWhite onClick={()=>navigate('/')} />
          </div>
        </div>
      </div>
      <div className="video-container">
        <ReactPlayer
          url={videosData[selectedVideoIndex]?.videoURL}
          height={"calc(100vh - 80px)"}
          width={"100%"}
          controls={false}
          playing={true}
          loop={true}
        />
        {/* <img src={videoPlaceholder} alt="video" /> */}
      </div>
      <div className="bottom-area">
        {videoCreatorType === "business" && (
          <div
            className="add-new-container"
            onClick={() => navigate("/video/add")}
          >
            <Typography className="colored-text">+</Typography>
            <Typography className="text">Add</Typography>
          </div>
        )}
        <div className="arrow-container" onClick={showHideCarousel}>
          <KeyboardArrowDown className="down-icon" id="down-icon" />
        </div>
        <div className="carousel-area" id="carousel-area">
          <div className="carousel-arrows-container">
            <div className="left-arrow" onClick={moveLeft}>
              <ArrowLeft />
            </div>
            <div className="right-arrow" onClick={moveRight}>
              <ArrowRight />
            </div>
          </div>
          <div className="carousel-container" id="carousel-container">
            {videosData?.map((video, index) => (
              <div className={`carousel-item ${getCarouselImageSize(index)} `}>
                <img src={video?.thumbnail} alt="video" />
              </div>
            ))}
          </div>
        </div>
        <div className="status-area">{VideoCreatorTag()}</div>
      </div>
    </div>
  );
}

export default ImmersiveView;
