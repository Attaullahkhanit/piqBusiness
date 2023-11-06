import React from "react";
import "./styles.scss";
import singinHeaderImg from "../../../assets/admin/singin/Rectangle 7342.png";
import downHeaderimg from "../../../assets/admin/singin/Ellipse 256.png";
import icon1 from "../../../assets/admin/singin/user (6) 1.svg";
import arrowicon from "../../../assets/admin/singin/Path 13351.svg";
import { ReactComponent as AcountInformation } from "../../../assets/business/settings/accountInformation.svg";
import { ReactComponent as LockIcon } from "../../../assets/business/settings/changePassword.svg";
import { ReactComponent as RfferalRoyalities } from "../../../assets/business/settings/refferalRoyalities.svg";
import { ReactComponent as SubscriptionPlan } from "../../../assets/business/settings/subscriptionPlan.svg";
import { ReactComponent as UsersAndAccess } from "../../../assets/business/settings/usersAndAccess.svg";
import { ReactComponent as Exit } from "../../../assets/business/settings/exit.svg";
import profilePlaceholder from "../../../assets/business/home/profilePlaceholder.png";
import coverPlaceholder from "../../../assets/business/home/coverPhotoPlaceholder.png";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../redux/slices/auth";
import { showSuccessToast } from "../../../utils/showToast";

export default function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
console.log(businessData, 'businessData')
  const handleLogout = () => {
    dispatch(Logout());
    showSuccessToast("log out successful");
    navigate("/signin");
  };
  return (
    <div className="settings-page">
      <Box className="dash-section" id="content-cards-container">
        <Box>
          <img
            src={
              businessData?.coverPhoto.trim() !== ""
                ? businessData?.coverPhoto
                : coverPlaceholder
            }
            alt="headerImage"
            className="singin-header-image"
          />
        </Box>
        <Box className="food-Hallen-downHeader">
          <Box className="food_hallen-img-sect">
            <img
              src={
                businessData?.businessImageUrl.trim() !== ""
                  ? businessData?.businessImageUrl
                  : profilePlaceholder
              }
              alt=""
              className="food-Hallen-downHeader-icon"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "40px",
            }}>
            <Box>
              <Typography className="food-hallen-text">
                {businessData?.businessName}
              </Typography>
            </Box>
            <Box className="inline-list">
              <ul>
                <li>{businessData?.city}</li>
                {businessData?.subCategories?.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="dash-setting-text-section">
        <Typography className="dash-setting-text">Settings</Typography>
      </Box>
      <Box className="dash-setting-section" id="content-cards-container">
        <Box>
          <Box className="dash-setting-section-list-item">
            <Box className="dash-setting-lefarea">
              <AcountInformation />
              <Typography sx={{ paddingLeft: "10px" }}>
                Account Information
              </Typography>
            </Box>
            <Box
              onClick={() => {
                // navigate("/settings/accountinformation/:id");
              }}>
              <img src={arrowicon} alt="arrow" />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="dash-setting-section-list-item">
            <Box className="dash-setting-lefarea">
              <SubscriptionPlan />
              <Typography sx={{ paddingLeft: "10px" }}>
                Subscription Plan
              </Typography>
            </Box>
            <Box>
              <img src={arrowicon} alt="arrow" />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="dash-setting-section-list-item">
            <Box className="dash-setting-lefarea">
              <UsersAndAccess />
              <Typography sx={{ paddingLeft: "10px" }}>
                Users & Access
              </Typography>
            </Box>
            <Box>
              <img src={arrowicon} alt="arrow" />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            className="dash-setting-section-list-item"
            onClick={() => {
              navigate("/settings/referral");
            }}>
            <Box className="dash-setting-lefarea">
              <RfferalRoyalities />
              <Typography sx={{ paddingLeft: "10px" }}>
                Referral Royalties
              </Typography>
            </Box>
            <Box>
              <img src={arrowicon} alt="arrow" />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="dash-setting-section-list-item" onClick={() => {
                navigate("/changepassword");
              }}>
            <Box className="dash-setting-lefarea">
              <LockIcon />
              <Typography sx={{ paddingLeft: "10px" }}>
                Change Password
              </Typography>
            </Box>
            <Box
              onClick={() => {
                navigate("/changepassword");
              }}>
              <img src={arrowicon} alt="arrow" />
            </Box>
          </Box>
        </Box>
        
        <Box>
          <Box
            className="dash-setting-section-list-item"
            onClick={handleLogout}>
            <Box className="dash-setting-lefarea">
              <Exit />
              <Typography sx={{ paddingLeft: "10px" }}>Logout</Typography>
            </Box>
            <Box>
              <img src={arrowicon} alt="arrow" />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
