import {
  Box,
  CircularProgress,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import profilePicture from "../../../../assets/admin/Profile/profilePicture.png";
import profileBackground from "../../../../assets/admin/Profile/profileBackground.png";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import SecondaryButton from "../../../../components/Buttons/Secondary/SecondaryButton";
import shop from "../../../../assets/admin/Dashboard/shop.png";
import addressIcon from "../../../../assets/admin/Profile/addressIcon.png";
import phoneIcon from "../../../../assets/admin/Profile/phone.png";
import emailIcon from "../../../../assets/admin/Profile/email.png";
import noImage from "../../../../assets/admin/Profile/noImagePlaceholder.png";
import filterIcon from "../../../../assets/admin/Profile/filter.png";
import priceTag from "../../../../assets/admin/Profile/price-tag.png";
import linkIcon from "../../../../assets/admin/Profile/link.png";
import searchIcon from "../../../../assets/admin/common/search.png";
import categoryIcon from "../../../../assets/admin/Profile/category.png";
import userProfileImage from "../../../../assets/admin/common/userDummy.png";
import arrowDown from "../../../../assets/business/navbar/arrowDown.png";
import "./styles.scss";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import NormalSelect from "../../../../components/InputFields/NormalSelect/NormalSelect";
import MultilineInput from "../../../../components/InputFields/MultilineInput/MultilineInput";
import DayTimingCard from "../../../../components/cards/DayTimingCard/DayTimingCard";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../../../../components/cards/Subscription/SubscriptionCard";
import { subscriptionCardData } from "../../../../components/cards/Subscription/dummyContent";
import { Add } from "@mui/icons-material";
import ImageCropper from "../../../../components/ImageCropper/ImageCropper";
import { handleFileSelect } from "../../../../components/ImageCropper/utils";
import { checkIfEmpty } from "../../../../utils/checkIfEmpty";
import { useDispatch, useSelector } from "react-redux";
import { setProfileInformation } from "../../../../redux/slices/profileDataSlice";
import uploadToFirestoreStorage from "../../../../utils/uploadToFirestoreStorage";
import approveProfileInFirebase from "../../../../apis/dashboard/Profiles/approveProfile";
import Loader from "../../../../components/Utils/Loader/Loader";
import getSingleBusinessData from "../../../../apis/business/getBusinessData";
import reformatOperationalData from "../../../../utils/reformatOperationalData";
import { setBusinessData } from "../../../../redux/slices/businessProfileSlice";
import saveBusinessToFirebase from "../../../../apis/business/saveBusinessToFirebase";
import { debounce } from "../../../../utils/searchData";
import { searchLocation } from "../../../../apis/common/searchLocation";

import RemoveBackgroundModal from "../../../../components/Modals/RemoveBackgroundModal/RemoveBackgroundModal";
import { showSuccessToast } from "../../../../utils/showToast";
function ProfileDetails({ id, header, type, selectedRefIndex, setResults }) {
  const profileInformation = useSelector(
    (state) => state.profileData.profileInformation
  );
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
  const [approvalLoading, setApprovalLoading] = useState(false);
  const profileData = useSelector((state) => state.profileData);
  const [subscriptionType, setSubscriptionType] = useState(
    profileInformation?.subscriptionType || "Free Plan"
  );
  const [selectedRef, setSelectedRef] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadedBackgroundFile, setUploadedBackgroundFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(
    type === "add"
      ? ""
      : businessData?.businessImageUrl ||
          profileInformation?.profileImage ||
          null
  );
  const [croppedImageBase64, setCroppedImageBase64] = useState(null);
  const [croppedBackgroundBase64, setCroppedBackgroundBase64] = useState(null);
  const [croppedBackground, setCroppedBackground] = useState(
    type === "add"
      ? ""
      : businessData?.coverPhoto ||
          profileInformation?.profileBackground ||
          null
  );
  const [name, setName] = useState(
    type === "add"
      ? ""
      : businessData?.businessName || profileInformation?.name || ""
  );
  const [location, setLocation] = useState(
    type === "add"
      ? ""
      : businessData?.address || profileInformation?.location || ""
  );
  const [phone, setPhone] = useState(
    type === "add"
      ? ""
      : businessData?.businessPhone || profileInformation?.phone || ""
  );
  const [email, setEmail] = useState(
    type === "add"
      ? ""
      : businessData?.businessEmail || profileInformation?.email || ""
  );
  const [website, setWebsite] = useState(
    type === "add"
      ? ""
      : businessData?.businessWebsite || profileInformation?.website || ""
  );
  const [instagram, setInstagram] = useState(
    type === "add" ? "" : businessData?.order || profileInformation?.order || ""
  );
  const [establishmentType, setestablishmentType] = useState(
    type === "add"
      ? []
      : businessData?.subCategories || profileInformation?.categories || ""
  );
  const [about, setAbout] = useState(
    type === "add" ? "" : businessData?.about || profileInformation?.about || ""
  );
  const [timing, setTiming] = useState(
    type === "add"
      ? [
          { weekday: 1, day: "Monday", open: "", close: "", status: false },
          { weekday: 2, day: "Tuesday", open: "", close: "", status: false },
          { weekday: 3, day: "Wednesday", open: "", close: "", status: false },
          { weekday: 4, day: "Thursday", open: "", close: "", status: false },
          { weekday: 5, day: "Friday", open: "", close: "", status: false },
          { weekday: 6, day: "Saturday", open: "", close: "", status: false },
          { weekday: 7, day: "Sunday", open: "", close: "", status: false },
        ]
      : (businessData?.operationalData &&
          reformatOperationalData(businessData?.operationalData)) ||
          profileInformation?.timing || [
            { weekday: 1, day: "Monday", open: "", close: "", status: false },
            { weekday: 2, day: "Tuesday", open: "", close: "", status: false },
            {
              weekday: 3,
              day: "Wednesday",
              open: "",
              close: "",
              status: false,
            },
            { weekday: 4, day: "Thursday", open: "", close: "", status: false },
            { weekday: 5, day: "Friday", open: "", close: "", status: false },
            { weekday: 6, day: "Saturday", open: "", close: "", status: false },
            { weekday: 7, day: "Sunday", open: "", close: "", status: false },
          ]
  );
  const dispatch = useDispatch();

  const [removedbackground, setRemovedbackground] = useState(false);

  const AccountInfoRef = useRef(null);
  const HoursRef = useRef(null);
  const SubscriptionRef = useRef(null);
  const UsersRef = useRef(null);
  const navigate = useNavigate();

  // scroll to given ref on page
  const executeScroll = (selectedRef) =>
    selectedRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  const handleSaveEditProfile = () => {
    setApprovalLoading(true);
    const data = {
      businessName: name,
      address: location,
      businessPhone: phone,
      businessEmail: email,
      businessWebsite: website,
      instagram: instagram,
      establishmentType: establishmentType,
      about: about,
      operationalData: timing,
      businessImageUrl: croppedImage,
      coverPhoto: croppedBackground,
    };
    // console.log(data, "data ");
      // dispatch(setBusinessData(data));
      saveBusinessToFirebase(id, data).then(() => {
      setApprovalLoading(false);
      navigate(`/${id}`);
      // showSuccessToast("Data Successfully updated")
    });
  };

  useEffect(() => {
    if (selectedRefIndex !== -1) {
      switch (selectedRefIndex) {
        case 0:
          setSelectedRef(AccountInfoRef);
          break;
        case 1:
          setSelectedRef(SubscriptionRef);
          break;
        case 2:
          setSelectedRef(UsersRef);
      }
    }
  }, [selectedRefIndex]);

  useEffect(() => {
    if (selectedRef !== null) {
      executeScroll(selectedRef);
    }
  }, [selectedRef]);

  useEffect(() => {
    if (uploadedImageFile) {
      setUploadedBackgroundFile(null);
      setOpenImageModal(true);
    }
  }, [uploadedImageFile]);

  useEffect(() => {
    if (uploadedBackgroundFile) {
      setUploadedImageFile(null);
      setOpenImageModal(true);
    }
  }, [uploadedBackgroundFile]);

  useEffect(() => {
    if (croppedBackgroundBase64) {
      uploadToFirestoreStorage(
        croppedBackgroundBase64,
        "images",
        uploadedBackgroundFile?.name,
        true
      ).then((url) => {
        dispatch(
          setProfileInformation({
            ...profileInformation,
            backgroundFirebaseUrl: url,
          })
        );
      });
    }
  }, [croppedBackgroundBase64]);

  useEffect(() => {
    if (croppedImageBase64) {
      uploadToFirestoreStorage(
        croppedImageBase64,
        "images",
        uploadedImageFile?.name,
        true
      ).then((url) => {
        dispatch(
          setProfileInformation({
            ...profileInformation,
            profileImageFirebaseUrl: url,
          })
        );
      });
    }
  }, [croppedImageBase64]);

  const handleClose = () => {
    setOpenImageModal(false);
    setUploadedImageFile(null);
    setUploadedBackgroundFile(null);
  };

  useEffect(() => {
    console.log(profileInformation, "profileInformation");
  }, [profileInformation]);
  const handleTimingChange = (index, type, value) => {
    setTiming((prev) => {
      const newTiming = [...prev];
      if (type === "open") {
        newTiming[index].open = value;
      } else if (type === "close") {
        newTiming[index].close = value;
      } else {
        newTiming[index].status = value;
      }
      return newTiming;
    });
  };

  const handleSubmit = () => {
    dispatch(
      setProfileInformation({
        ...profileInformation,
        name,
        location,
        phone,
        email,
        website,
        instagram,
        establishmentType,
        about,
        timing,
        profileImage: croppedImage,
        profileBackground: croppedBackground,
        subscriptionType,
      })
    );
  };

  const handleApprove = (id) => {
    setApprovalLoading(true);
    console.log(id);
    approveProfileInFirebase(id, "approved").then(() => {
      setApprovalLoading(false);
    });
  };

  const handleReject = (id) => {
    setApprovalLoading(true);
    approveProfileInFirebase(id, "rejected").then(() => {
      setApprovalLoading(false);
      navigate("/");
    });
  };

  const handleRemoveBackground = () => {
    // Call setCroppedBackground with null to remove the background image
    setCroppedBackground(null);
  };

  const [websiteErrorMessage, setWebsiteErrorMessage] = useState("");
  const validateWebsite = (website) => {
    const pattern = /^www\..+\.com$/i; // Case-insensitive match
    return pattern.test(website);
  };

  const changwebsitefield = (e) => {
    const websiteValue = e.target.value;

    if (websiteValue === "") {
      setWebsiteErrorMessage("Website is Required*");
    } else if (!validateWebsite(websiteValue)) {
      setWebsiteErrorMessage("Invalid Website Format");
    } else {
      setWebsiteErrorMessage("");
    }
    setWebsite(websiteValue);
  };

  //  validation phone number
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/; // Example pattern for 10-digit phone number
    return pattern.test(phoneNumber);
  };

  const changePhoneField = (e) => {
    const phonefieldvalue = e.target.value;
    if (phonefieldvalue === "") {
      setPhoneErrorMessage("Phone Number is Required*");
    } else if (!validatePhoneNumber(phonefieldvalue)) {
      setPhoneErrorMessage("Invalid Phone Number Format");
    } else {
      setPhoneErrorMessage("");
    }

    setPhone(phonefieldvalue);
  };
  //  email validation
  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const changeEmailField = (e) => {
    const emailfieldvalue = e.target.value;
    if (emailfieldvalue == "") {
      setEmailErrorMessage("Email is Required*");
    } else if (!validateEmail(emailfieldvalue)) {
      setEmailErrorMessage("Invalid Email Format");
    } else {
      setEmailErrorMessage("");
    }
    setEmail(e.target.value);
  };

  // Search Bar show five list
  const [input, setInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();

  const [filteredLocations, setFilteredLocations] = useState([]);

  const fetchData = async (value) => {
    await searchLocation(value)
      .then((res) => {
        console.log(res, "res");
        setFilteredLocations(res.results);
      })
      .catch((err) => {});
  };

  const searchbar = (e) => {
    const changeData = e.target.value;
    setInput(changeData);
    setSelectedLocation(changeData);
  };

  useEffect(() => {
    if (input.trim() !== "") {
      const search = setTimeout(() => {
        fetchData(input);
      }, 1200);
      return () => clearTimeout(search);
    }
  }, [input]);

  return (
    <Box className="profile-details">
      <Box className="cropper-container">
        <ImageCropper
          image={uploadedImageFile}
          background={uploadedBackgroundFile}
          openModal={openImageModal}
          handleClose={handleClose}
          setCroppedImage={setCroppedImage}
          setCroppedBackground={setCroppedBackground}
          setCroppedImageBase64={setCroppedImageBase64}
          setCroppedBackgroundBase64={setCroppedBackgroundBase64}
        />
      </Box>

      <Box className="header" ref={AccountInfoRef}>
        {header}
      </Box>
      <Typography className="sub-title">Account Information</Typography>
      <Box className="form-area">
        <Box className="assets-container">
          <Box className="logo-area">
            <Typography className="text">Logo</Typography>
            <Box className="profile-picture-container">
              {type === "add" && !croppedImage ? (
                <Box className="no-image-placeholder-container">
                  <img
                    src={noImage}
                    alt="no-profile-picture"
                    className="no-profile-image"
                  />
                </Box>
              ) : (
                <img
                  src={croppedImage || profilePicture}
                  alt="profile-picture"
                  className="profile-image"
                />
              )}
              <Box className="action-buttons-container">
                <div id="profile-change-button">
                  <PrimaryButton
                    text={"Change"}
                    height={"50px"}
                    setSelectedImageFile={setUploadedImageFile}
                    type={"file"}
                    imageType={"profile"}
                    handleFileSelect={handleFileSelect}
                  />
                </div>
              </Box>
            </Box>
          </Box>
          <Box className="background-area">
            <Typography className="text">Background</Typography>
            <Box className="background-container">
              {type === "add" && !croppedBackground ? (
                <Box className="no-image-placeholder-container">
                  <img
                    src={noImage}
                    alt="no-profile-picture"
                    className="no-profile-image"
                  />
                </Box>
              ) : (
                <img
                  src={croppedBackground || noImage || profileBackground}
                  alt="profile-background"
                />
              )}
              <Box className="action-buttons-container">
                <div
                  id="background-change-button"
                  style={{ marginBottom: "10px" }}>
                  <PrimaryButton
                    text={"Change"}
                    height={"50px"}
                    setSelectedImageFile={null}
                    setSelectedBackgroundFile={setUploadedBackgroundFile}
                    type={"file"}
                    imageType={"background"}
                    handleFileSelect={handleFileSelect}
                  />
                </div>
                {/* for review we have this */}
                {type !== "add" && (
                  <SecondaryButton
                    text={"Delete"}
                    height={"50px"}
                    onClick={() => {
                      setRemovedbackground(true);
                    }}
                  />
                )}
              </Box>
            </Box>
            {removedbackground && (
              <RemoveBackgroundModal
                open={removedbackground} // Pass the 'open' prop to control modal visibility
                onClose={() => setRemovedbackground(false)}
                onConfirmRemove={() => {
                  handleRemoveBackground();
                  setRemovedbackground(false);
                }}
              />
            )}
          </Box>
        </Box>
        <Box className="fields-area">
          <Box className="field-container">
            <Box className="title-container">
              <img src={shop} alt="icon" />
              <Typography className="title">Name</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Here"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box className="field-container" sx={{ position: "relative" }}>
            <Box className="title-container">
              <img src={addressIcon} alt="icon" />
              <Typography className="title">Location</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Location"}
              value={selectedLocation}
              onChange={searchbar}
            />
            <Box
              card
              sx={{
                position: "absolute",
                backgroundColor: "#fff",
                width: "100%",
                justifyContent: "center",
                boxShadow: 3,
                borderRadius: 1,
                maxHeight: "120px",
                overflow: "hidden",
                zIndex: "999",
              }}>
              {filteredLocations?.map((item) => {
                return (
                  <ListItemButton
                    sx={{ maxHeight: "30px", zIndex: "999" }}
                    onClick={() => {
                      setSelectedLocation(item.title);
                      setFilteredLocations([]);
                      setLocation(item);
                    }}
                    className="search-list-item">
                    {item.title}
                  </ListItemButton>
                );
              })}
            </Box>
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={phoneIcon} alt="icon" />
              <Typography className="title">Phone</Typography>
            </Box>
            <IconInput
              placeholder={"000-000-0000"}
              value={phone}
              onChange={changePhoneField}
              phoneErrorMessage={phoneErrorMessage}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={emailIcon} alt="icon" />
              <Typography className="title">Email</Typography>
            </Box>
            <IconInput
              placeholder={"abc@gmail.com"}
              value={email}
              onChange={changeEmailField}
              errorMessage={emailErrorMessage}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={linkIcon} alt="icon" />
              <Typography className="title">Website</Typography>
            </Box>
            <IconInput
              placeholder={"www.abc.com"}
              value={website}
              onChange={changwebsitefield}
              websiteErrorMessage={websiteErrorMessage}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={linkIcon} alt="icon" />
              <Typography className="title">Business Instagram</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Link"}
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <img src={categoryIcon} alt="icon" />
              <Typography className="title">Establishment (Type)</Typography>
            </Box>
            <IconInput
              placeholder={"Enter Here"}
              value={establishmentType}
              onChange={(e) => setestablishmentType(e.target.value)}
            />
          </Box>
          <Box className="field-container">
            <Box className="title-container">
              <Typography className="title">Subscription</Typography>
            </Box>
            <NormalSelect
              selectValue={subscriptionType}
              menuItems={["Free Plan", "Starter Plan", "piq Plan"]}
              onSelectChange={(e) => setSubscriptionType(e.target.value)}
            />
          </Box>
          <Box className="field-container-full">
            <Box className="title-container">
              <Typography className="title">About</Typography>
            </Box>
            <MultilineInput
              placeholder={"Enter Message Here"}
              minRows={4}
              maxRows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
      <Box className="timings-container" ref={HoursRef}>
        <Typography className="sub-title">Hours</Typography>
        <Grid container className="timing-schedule-container" spacing={5}>
          {timing.map((day, index) => (
            <Grid item xs={6}>
              <DayTimingCard
                day={day.day}
                openTime={day.open}
                closeTime={day.close}
                dayStatus={day.status}
                disabled={!day.status}
                onDayStatusChange={(e) =>
                  handleTimingChange(index, "status", e.target.checked)
                }
                onOpenTimeChange={(e) =>
                  handleTimingChange(index, "open", e.target.value)
                }
                onCloseTimeChange={(e) =>
                  handleTimingChange(index, "close", e.target.value)
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {type === "manage" && (
        <Box ref={SubscriptionRef}>
          <Typography className="sub-title">Subscription Plan</Typography>
        </Box>
      )}
      {type === "manage" && (
        <Box className="subscriptions-container">
          {subscriptionCardData.map((card, index) => (
            <SubscriptionCard
              icon={card?.icon}
              title={card.title}
              price={card.price}
              details={card.details}
              buttonText={card.buttontext}
              offered={card.current}
            />
          ))}
        </Box>
      )}
      {type === "manage" && (
        <Box className="user-access-container">
          <Box className="user-access-title-area" ref={UsersRef}>
            <Typography className="sub-title">User & Access</Typography>
            <Box className="add-user-button-container">
              <Add />
            </Box>
          </Box>
          <Box className="user-access-search-container">
            <IconInput placeholder={"Enter Here"} icon={searchIcon} />
            <Box className="image-container">
              <img src={filterIcon} alt="filterIcon" />
            </Box>
          </Box>
          <Box className="user-access-cards-container">
            <Box className="user-access-card">
              <Box className="left-area">
                <Box className="image-container">
                  <img src={userProfileImage} alt="user" />
                </Box>
                <Box className="title-container">
                  <Typography className="title">Sophia James</Typography>
                  <Typography className="last-login">
                    Last login: Apr 23, 2023
                  </Typography>
                </Box>
              </Box>
              <Box className="right-area">
                <Box className="role-container">
                  <Typography className="role">Admin</Typography>
                </Box>
                <img src={arrowDown} alt="arrow-down" />
              </Box>
            </Box>
          </Box>
          <Box className="user-access-cards-container">
            <Box className="user-access-card">
              <Box className="left-area">
                <Box className="image-container">
                  <img src={userProfileImage} alt="user" />
                </Box>
                <Box className="title-container">
                  <Typography className="title">Sophia James</Typography>
                  <Typography className="last-login">
                    Last login: Apr 23, 2023
                  </Typography>
                </Box>
              </Box>
              <Box className="right-area">
                {/* <Box className="role-container">
                <Typography className="role">Admin</Typography>
              </Box> */}
                <img src={arrowDown} alt="arrow-down" />
              </Box>
            </Box>
          </Box>
          <Box className="user-access-cards-container">
            <Box className="user-access-card">
              <Box className="left-area">
                <Box className="image-container">
                  <img src={userProfileImage} alt="user" />
                </Box>
                <Box className="title-container">
                  <Typography className="title">Sophia James</Typography>
                  <Typography className="last-login">
                    Last login: Apr 23, 2023
                  </Typography>
                </Box>
              </Box>
              <Box className="right-area">
                {/* <Box className="role-container">
                <Typography className="role">Admin</Typography>
              </Box> */}
                <img src={arrowDown} alt="arrow-down" />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {type === "manage" ? (
        <Box className="bottom-area-fixed">
          <Loader loading={approvalLoading}>
            <div>
              <PrimaryButton
                text={"Save"}
                disabled={false}
                onClick={handleSaveEditProfile}
                // onClick={() => {
                //   navigate("/profiles/add");
                // }}
              />
            </div>
          </Loader>
        </Box>
      ) : type === "add" ? (
        <Box className="bottom-area">
          <div>
            <PrimaryButton
              text={"Next"}
              disabled={
                checkIfEmpty("name", name) ||
                checkIfEmpty("location", location) ||
                checkIfEmpty("phone", phone) ||
                checkIfEmpty("email", email) ||
                checkIfEmpty("website", website) ||
                checkIfEmpty("instagram", instagram) ||
                checkIfEmpty("establishmentType", establishmentType) ||
                checkIfEmpty("about", about) ||
                checkIfEmpty("timing", timing) ||
                checkIfEmpty("croppedImage", croppedImage) ||
                checkIfEmpty("cropped bg", croppedBackground)
              }
              onClick={() => {
                handleSubmit();
                navigate("/profiles/addBusiness/progress");
              }}
            />
          </div>
        </Box>
      ) : (
        <Box className="bottom-area">
          <Loader loading={approvalLoading}>
            <div>
              <SecondaryButton
                text={"Deny"}
                onClick={() => handleReject(profileInformation?.id)}
              />
            </div>
            <div>
              <PrimaryButton
                text={"Approve"}
                onClick={() => handleApprove(profileInformation?.id)}
              />
            </div>
          </Loader>
        </Box>
      )}
    </Box>
  );
}

export default ProfileDetails;
