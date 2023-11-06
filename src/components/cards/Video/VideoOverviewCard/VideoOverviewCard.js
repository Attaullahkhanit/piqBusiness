import React from "react";
import "./styles.scss";
import draggableIcon from "../../../../assets/business/home/draggableIcon.png";
import videoIcon from "../../../../assets/business/home/video.png";
import { Box, Typography } from "@mui/material";

export default function VideoOverviewCard({
  pending,
  image,
  price,
  title,
  views,
  onClick
}) {
  return (
    <div className="video-overview-card" onClick={onClick}>
      <img src={image} alt="video" className="video-image" />
      <div className="video-details-container">
        {pending ? (
          <div className="top-area">
            <Typography className="pending">Pending...</Typography>
          </div>
        ) : (
          <div className="top-area">
            <img
              src={draggableIcon}
              alt="draggable"
              className="draggable-icon"
            />
            <Box className="views-container">
              <Typography className="views">{views}</Typography>
              <img src={videoIcon} alt="video" className="video-icon" />
            </Box>
          </div>
        )}

        <div className="bottom-area">
          <Typography className="title">{title}</Typography>
          <Typography className="price">{price}</Typography>
        </div>
      </div>
    </div>
  );
}
