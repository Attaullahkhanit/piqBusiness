import React, { useEffect } from "react";
import "./styles.scss";
import piqLogo from "../../assets/admin/common/piqLogo.png";
import arrowDown from "../../assets/business/navbar/arrowDown.png";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as WalletIcon } from "../../assets/business/wallet.svg";
import { ReactComponent as ShopIcon } from "../../assets/business/navbar/shop.svg";
import { ReactComponent as PerformanceIcon } from "../../assets/business/navbar/performance.svg";
import { ReactComponent as MessagesIcon } from "../../assets/business/navbar/messages.svg";
import { ReactComponent as NotificationsIcon } from "../../assets/business/navbar/notifications.svg";
import { ReactComponent as SettingsIcon } from "../../assets/business/navbar/settings.svg";
import profilePlaceholder from "../../assets/business/home/profilePlaceholder.png";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../Buttons/Primary/PrimaryButton";
import { Logout } from "../../redux/slices/auth";

function BusinessNavbar({ hideProfileSwitch }) {
  const profiles = useSelector((state) => state.auth.allBusinesses);
  const dispatch = useDispatch();

  const selectedBusiness = useSelector(
    (state) => state.businessProfile.businessData
  );
  const NAV_LINKS = [
    {
      icon: ShopIcon,
      label: "Business",
    },
    { icon: PerformanceIcon, label: "Performance" },
    { icon: MessagesIcon, label: "Messages", path: "/chatwithusers" },
    { icon: NotificationsIcon, label: "Notifications" },
    { icon: SettingsIcon, label: "Settings", path: "/settings" },
    { icon: WalletIcon, label: "Wallet", path: "/wallet" },
  ];
  const navigate = useNavigate();
  const [profilesOpen, setProfilesOpen] = React.useState(false);
  const [selectedProfile, setSelectedProfile] =
  React.useState(selectedBusiness);
  const location = useLocation();

  const handleProfileChange = (index) => {
    setSelectedProfile(profiles[index]);
    navigate(`/${profiles[index]?.businessId}`);
  };

  useEffect(() => {
    setSelectedProfile(selectedBusiness);
  }, [selectedBusiness]);

  const redirectToHome = () => {
        navigate('/')
  }
  return (
    <Box className="business-navbar">
      <Box className="left-area">
        <Box className="logo-area" onClick={redirectToHome}>
            <img src={piqLogo} alt="logo" />
        </Box>
        
        {location.pathname !== "/choosebusiness" && (
          <Box sx={{ width: "200px" }}>
            <PrimaryButton
              text={"Add New Business"}
              height={"45px"}
              onClick={() => navigate("/choosebusiness")}
            />
          </Box>
        )}
      </Box>
      <Box className="right-area">
        {!hideProfileSwitch && (
          <Box className={hideProfileSwitch ? "links-area-full" : "links-area"}>
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <Box
                  key={link.label}
                  className={`link-item${isActive ? "-selected" : ""}`}
                  onClick={() => {
                    if (link.label === "Business") {
                      navigate(`/${selectedProfile?.id}`);
                    } else {
                      navigate(link.path);
                    }
                  }}>
                  <Icon
                    fill={isActive ? "#ffda46" : "rgba(255, 255, 255, 0.63)"} // Change the fill color to gray
                  />
                </Box>
              );
            })}
          </Box>
        )}
        {(!hideProfileSwitch && profiles.length > 1) && (
          <Box
            className={profilesOpen ? "profile-area-opened" : "profile-area"}
            onClick={() => {
              setProfilesOpen(!profilesOpen);
            }}>
            {profilesOpen ? (
              profiles.map((profile, index) => (
                <Box className="profile-card-container">
                  <Box
                    className="profile-card"
                    onClick={() => handleProfileChange(index)}>
                    <img
                      src={
                        profile.businessImageUrl.trim() !== "" &&
                        profile.businessImageUrl
                          ? profile.businessImageUrl
                          : profilePlaceholder
                      }
                      className="profile-image"
                      alt="profile"
                    />
                    <Box className="profile-info">
                      <Typography className="profile-name-opened">
                        {profile.businessName}
                      </Typography>
                      <Typography className="user-name">
                        {profile.city}
                      </Typography>
                    </Box>
                  </Box>
                  {index === 0 && (
                    <img
                      className="arrow-down"
                      src={arrowDown}
                      alt="arrow-down"
                    />
                  )}
                </Box>
              ))
            ) : (
              <Box className="profile-card">
                <img
                  src={
                    selectedProfile?.businessImageUrl.trim() !== "" &&
                    selectedProfile?.businessImageUrl
                      ? selectedProfile?.businessImageUrl
                      : profilePlaceholder
                  }
                  className="profile-image"
                  alt="profile"
                />
                <Box className="profile-info">
                  <Typography className="profile-name">
                    {selectedProfile?.businessName.length > 17
                      ? selectedProfile?.businessName.slice(0, 17) + "..."
                      : selectedProfile?.businessName}
                  </Typography>
                  <Typography className="user-name">
                    {selectedProfile?.city}
                  </Typography>
                </Box>
                <img className="arrow-down" src={arrowDown} alt="arrow-down" />
              </Box>
            )}
          </Box>
        )}
        {location.pathname === "/choosebusiness" && (
          <Box className="logout-area">
            <PrimaryButton
              text={"Sign Out"}
              height={"50px"}
              onClick={() => dispatch(Logout())}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BusinessNavbar;
