import React, { useEffect, useRef } from "react";
import "./styles.scss";
import { Box, Modal, Typography } from "@mui/material";
import dot from "../../../assets/admin/Dashboard/dot.png";
import SIngleVideoPlayback from "../../../components/videoComponent/SingleVideoPlayback/SIngleVideoPlayback";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import NormalSelect from "../../../components/InputFields/NormalSelect/NormalSelect";
import MultilineInput from "../../../components/InputFields/MultilineInput/MultilineInput";
import searchIcon from "../../../assets/admin/common/search.png";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/Secondary/SecondaryButton";
import ContentStats from "./ContentStats/ContentStats";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Utils/Loader/Loader";
import { fetchAssetById } from "../../../apis/dashboard/content/fetchAssetById";
import getSingleBusinessData from "../../../apis/business/getBusinessData";
import { updateAssetById } from "../../../apis/dashboard/content/updateAsset";

function ContentDetail() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [assetData, setAssetData] = React.useState(null);
  const [assetDataUnchanged, setAssetDataUnchanged] = React.useState(null);
  const [assetDataLoading, setAssetDataLoading] = React.useState(false);
  const [ownerTags, setOwnerTags] = React.useState([]);
  const [aiTags, setAITags] = React.useState([]);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [businessData, setBusinessData] = React.useState({
    businessName: "",
    businessImageUrl: "",
    subCategories: [],
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const params = useParams();
  const ownerTagsFieldRef = useRef(null);

  const reformatTags = (tags) => {
    const newTags = tags.map((tag) => {
      return { name: tag, selected: true };
    });
    return newTags;
  };

  const handleChangeField = (fieldName, event) => {
    setAssetData({ ...assetData, [fieldName]: event.target.value });
  };

  const handleAddOwnerTag = (tag) => {
    const newTags = [...ownerTags, { name: tag, selected: true }];
    setOwnerTags(newTags);
  };

  const handleSaveAsset = () => {
    setSaveLoading(true);
    updateAssetById(assetData.id, assetData)
      .then(() => {
        setSaveLoading(false);
        navigate("/content/list");
      })
      .catch((err) => {
        console.error(err);
        setSaveLoading(false);
      });
  };

  //fetch calls
  const getAssetData = async () => {
    fetchAssetById(params.id).then((response) => {
      // location.pathname.includes('/content/detail')
      if (response) {
        // console.log(response)

        setAssetData(response);
        setAssetDataUnchanged(response);
        setOwnerTags(
          reformatTags(response?.indexerLabels.map((label) => label.name))
        );
        setCategory(response?.assetType);
        getSingleBusinessData(response.businessId)
          .then((businessData) => {
            setBusinessData({
              businessName: businessData.businessName,
              businessImageUrl: businessData.businessImageUrl,
              subCategories: businessData.subCategories,
            });
            setAssetDataLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setAssetDataLoading(false);
          });
        // setAITags(reformatTags(response.labels));
      }
    });
  };

  useEffect(() => {
    setAssetDataLoading(true);
    getAssetData();
  }, []);

  useEffect(() => {
    category && setAssetData({ ...assetData, ["assetType"]: category });
  }, [category]);

  return (
    <Loader loading={assetDataLoading || !assetDataUnchanged}>
      <Box className="content-detail">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
          sx={{
            backdropFilter: "blur(5px)",
          }}
        >
          <ContentStats handleClose={handleClose} />
        </Modal>
        {location.pathname.includes("/content/detail") ? (
          <Box className="title-area">
            <Typography className="title-text">Content Details</Typography>
          </Box>
        ) : (
          <Box className="title-area">
            <Typography className="title-text">Review Content</Typography>
            <Typography className="description-text">
              All content should be screened for accuracy and brand alignment.
              Content that contains illegal substance, violent activity, or
              pornographic material must be denied and flagged.
            </Typography>
          </Box>
        )}
        <Typography className="heading">Business</Typography>
        <Box className="header-area">
          <Box className="profile-details-area">
            <img
              src={businessData?.businessImageUrl}
              alt="profile"
              className="profile-image"
            />
            <Box className="profile-title-container">
              <Typography className="profile-title">
                {businessData?.businessName}
              </Typography>
              <Box className="tags-container">
                {businessData?.subCategories.map((label, index) => (
                  <Box className="tag-group">
                    <Typography className="tag">{label}</Typography>
                    {assetData?.labels?.length !== index + 1 && (
                      <img className="dot-image" alt="dot" src={dot} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box className="stats-area">
            <Box className="stats-container">
              <Box className="stat-group">
                <Typography className="stat-title">Reports</Typography>
                <Typography className="stat-value">100</Typography>
              </Box>
              <Box className="stat-group">
                <Typography className="stat-title">Warnings</Typography>
                <Typography className="stat-value">6</Typography>
              </Box>
              <Box className="stat-group">
                <Typography className="stat-title">Strikes</Typography>
                <Typography className="stat-value">2</Typography>
              </Box>
              <Box className="stat-group">
                <Typography className="stat-title">Subscription</Typography>
                <Typography className="stat-value">piq</Typography>
              </Box>
            </Box>
            <Box className="view-more-container" onClick={handleOpen}>
              <Typography className="view-more-text">View More</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="details-area">
          <Box className="video-container">
            <SIngleVideoPlayback
              data={assetData}
              businessData={businessData}
              index={1}
            />
          </Box>
          <Box className="form-container">
            <Box className="form-group-half">
              <Box className="field-container">
                <Typography className="field-title">
                  Name (What’s offered)
                </Typography>
                <IconInput
                  placeholder={"Enter Here"}
                  value={assetData?.assetName}
                  onChange={(event) => handleChangeField("assetName", event)}
                />
              </Box>
              <Box className="field-container">
                <Typography className="field-title">Category</Typography>
                <NormalSelect
                  menuItems={[
                    "Sneak Piq",
                    "Drink",
                    "Event",
                    "Experience",
                    "Food",
                    "Property",
                    "Stay",
                    "Product",
                    "Vehicle",
                    "Education",
                  ]}
                  selectValue={category}
                  onSelectChange={setCategory}
                />
              </Box>
            </Box>
            <Box className="form-group">
              <Box className="field-container">
                <Typography className="field-title">Description</Typography>
                <MultilineInput
                  placeholder={"Enter Message Here"}
                  // value={assetData?.description}
                  // onChange={(event) => handleChangeField("description", event)}
                />
              </Box>
            </Box>
            <Box className="form-group-half">
              <Box className="field-container">
                <Typography className="field-title">Owner Tags</Typography>
                <IconInput
                  placeholder={"Enter Here"}
                  id={"owner-tags-field"}
                  // ref={ownerTagsFieldRef}
                />
                <Box className="tags-container">
                  {ownerTags.map((tag, index) => (
                    <Box
                      className={tag.selected ? "tag-selected" : "tag"}
                      onClick={() => {
                        setOwnerTags(
                          ownerTags.map((tag, i) => {
                            if (i === index) {
                              return { ...tag, selected: !tag.selected };
                            } else {
                              return tag;
                            }
                          })
                        );
                      }}
                    >
                      <Typography className="tag-text">{tag.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="field-container">
                <Typography className="field-title">AI Tags</Typography>
                <IconInput placeholder={"Enter Here"} />
                <Box className="tags-container">
                  {aiTags.map((tag, index) => (
                    <Box
                      className={tag.selected ? "tag-selected" : "tag"}
                      onClick={() => {
                        setAITags(
                          aiTags.map((tag, i) => {
                            if (i === index) {
                              return { ...tag, selected: !tag.selected };
                            } else {
                              return tag;
                            }
                          })
                        );
                      }}
                    >
                      <Typography className="tag-text">{tag.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box className="form-group">
              <Box className="field-container">
                <Typography className="field-title">Creator</Typography>
                <IconInput placeholder={"Search"} icon={searchIcon} />
                <Box className="tags-container">
                  <Box className="tag">
                    <Typography className="tag-text">
                      {businessData?.businessName}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="actions-area">
          {location.pathname.includes("/content/detail") ? (
            <Loader loading={saveLoading}>
              <Box className="button-container">
                <SecondaryButton text={"Cancel"} />
                <PrimaryButton text={"Save"} onClick={handleSaveAsset} />
              </Box>
            </Loader>
          ) : (
            <Loader loading={saveLoading}>
              <Box className="button-container">
                <SecondaryButton text={"Reject"} />
                <PrimaryButton text={"Approve"} />
              </Box>
            </Loader>
          )}
        </Box>
      </Box>
    </Loader>
  );
}

export default ContentDetail;
