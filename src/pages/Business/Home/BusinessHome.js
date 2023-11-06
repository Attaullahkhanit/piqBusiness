import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Box, Grid, Typography } from "@mui/material";
import searchIcon from "../../../assets/admin/common/search.png";
import cross from "../../../assets/admin/Content/cross.png";
import bgOverlay from "../../../assets/business/home/shadow.png";
import shadowBottom from "../../../assets/business/home/shadowBottom.png";
import searchIconGrey from "../../../assets/business/home/searchGrey.png";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import VideoOverviewCard from "../../../components/cards/Video/VideoOverviewCard/VideoOverviewCard";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import AddVideoModal from "../../../components/videoComponent/AddVideoModal/AddVideoModal";
import ChooseVideoModal from "../../../components/videoComponent/ChooseVideoModal/ChooseVideoModal";
import profilePlaceholder from "../../../assets/business/home/profilePlaceholder.png";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import getSingleBusinessData from "../../../apis/business/getBusinessData";
import { useDispatch, useSelector } from "react-redux";
import getBusinessVideos from "../../../apis/business/getBusinessVideos";
import Loader from "../../../components/Utils/Loader/Loader";
import {
  setBusinessData,
  setBusinessVideoData,
} from "../../../redux/slices/businessProfileSlice";
import getTimeUntilOpeningOrClosing from "../../../utils/getTimeUntilOpeningOrClosing";
import { tagsData } from "./tagsData";
import searchData from "../../../utils/searchData";
function BusinessHome() {
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [showAddVideoModal, setShowAddVideoModal] = React.useState(false);
  const [showChooseVideoModal, setShowChooseVideoModal] = React.useState(false);
  const [data, setData] = React.useState({});
  const [selectedTag, setSelectedTag] = React.useState(null);
  const [businessVideos, setBusinessVideos] = React.useState([]);
  const [unFilteredBusinessVideos, setUnfilteredBusinessVideos] =
    React.useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = React.useState(true);
  const [videosLoading, setVideosLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handlers
  const handleOpenSearch = () => {
    setShowSearch(true);
    setSelectedTag(null);
  };
  const handleCloseSearch = () => {
    setShowSearch(false);
  };
  const handleOpenAddVideo = () => {
    setShowAddVideoModal(true);
  };
  const handleCloseAddVideo = () => {
    setShowAddVideoModal(false);
  };
  const handleOpenChooseVideo = () => {
    handleCloseAddVideo();
    setShowChooseVideoModal(true);
  };
  const handleCloseChooseVideo = () => {
    setShowChooseVideoModal(false);
  };

  //fetch Calls
  const getBusinessData = async () => {
    setIsLoading(true);
    //fetch business data
    if (id) {
      await getSingleBusinessData(id)
        .then((data) => {
          setData(data);
          dispatch(setBusinessData(data));
          setVideosLoading(true);
          //fetch business videos
          getVideos();
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      navigate("/choosebusiness");
    }
  };

  const getVideos = () => {
    //fetch videos
    getBusinessVideos(id || "YVMxusko8lYC9FEBMZkH")
      .then((data) => {
        setBusinessVideos(data);
        setUnfilteredBusinessVideos(data);
        dispatch(setBusinessVideoData(data));
        setVideosLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setVideosLoading(false);
      });
  };

  //useEffects

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
    getBusinessData();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      setBusinessVideos(
        unFilteredBusinessVideos.filter(
          (item) => item.assetType === tagsData[selectedTag].title
        )
      );
    }
  }, [selectedTag]);

  useEffect(() => {
    setBusinessVideos(
      searchData(unFilteredBusinessVideos, "assetName", searchValue)
    );
  }, [searchValue]);

  return (
    <Loader isLoading={isLoading}>
      <Box className="business-home">
        <img src={data?.coverPhoto} alt="bg" className="bg" />
        <img src={bgOverlay} alt="bg" className="bg-shadow" />
        <img src={shadowBottom} alt="bg" className="bg-bottom" />
        <Box className="business-home-container" sx={{ marginBottom: "150px" }}>
          <img
            className={`profile-image ${showSearch && "small"}`}
            src={data?.businessImageUrl || profilePlaceholder}
            alt="profile-image"
            onClick={() => {
              if (localStorage.getItem("businessData") && !videosLoading) {
                navigate("/immersiveView");
              }
            }}
          />
          <Box className={`business-details-area ${showSearch && "hidden"}`}>
            <Box className="title-container">
              <Typography className="title">{data?.businessName}</Typography>
              <Box className="tags-container">
                {data?.subCategories?.map((item, index) => (
                  <Box className="tag-group">
                    <Typography className="tag">{item}</Typography>
                    {index + 1 !== data?.subCategories.length && (
                      <img className="divider" src={cross} alt="dot" />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="stats-container">
              <Box className="top-area">
                <Box className="stats">
                  <Typography className="stats-title">Views</Typography>
                  <Typography className="stats-value">300K</Typography>
                </Box>
                <Box className="stats">
                  <Typography className="stats-title">Saved</Typography>
                  <Typography className="stats-value">300K</Typography>
                </Box>
                <Box className="stats">
                  <Typography className="stats-title">Shared</Typography>
                  <Typography className="stats-value">300K</Typography>
                </Box>
                <Box className="stats">
                  <Typography className="stats-title">Visits</Typography>
                  <Typography className="stats-value">300K</Typography>
                </Box>
              </Box>
              <Box className="bottom-area">
                <Typography className="performance-text" onClick={()=>{navigate('/performanceStats')}}>
                  Profile Performance
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="business-content-area">
            {showSearch ? (
              <Box className="search-container">
                <IconInput
                  icon={searchIconGrey}
                  dark={true}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Box className="tag-search" onClick={handleCloseSearch}>
                  <img src={cross} alt="cross" />
                </Box>
              </Box>
            ) : (
              <Box className="video-tags-container">
                <Box className="tag-search" onClick={handleOpenSearch}>
                  <img src={searchIcon} alt="search" />
                </Box>
                {tagsData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Box
                      className={selectedTag === index ? "tag-selected" : "tag"}
                      onClick={() => {
                        setSelectedTag(index);
                      }}>
                      <Icon
                        fill={selectedTag === index ? "#ffae00" : "white"}
                        height={"20px"}
                      />
                      <Typography className="tag-text">{item.title}</Typography>
                    </Box>
                  );
                })}
              </Box>
            )}
            <Loader loading={videosLoading || isLoading}>
              <Grid container spacing={2} className="videos-container">
                {businessVideos.map((video, index) => (
                  <Grid item xs={12} sm={6}>
                    <VideoOverviewCard
                      pending={video?.status === "pending"}
                      title={video?.assetName}
                      image={video?.thumbnail}
                      views={video?.views}
                      price={video?.price || ""}
                      onClick={() => navigate(`/videoDetail/${video?.assetId}`)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Loader>
          </Box>
        </Box>
        <AddVideoModal
          openModal={showAddVideoModal}
          handleClose={handleCloseAddVideo}
          handleOpenChooseVideoModal={handleOpenChooseVideo}
        />
        <ChooseVideoModal
          openModal={showChooseVideoModal}
          handleClose={handleCloseChooseVideo}
        />
        <Box className="action-buttons-container">
          <PrimaryButton text={"Add Content"} onClick={handleOpenAddVideo} />
          <Typography
            className="action-button-text"
            onClick={() => {
              navigate(`/profiles/manage/${id}`);
            }}>
            Edit Profile
          </Typography>
        </Box>
      </Box>
    </Loader>
  );
}

export default BusinessHome;
