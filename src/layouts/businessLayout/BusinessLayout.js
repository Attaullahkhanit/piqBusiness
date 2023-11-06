import React from "react";
import "./styles.scss";
import BusinessNavbar from "../../components/Navbar/BusinessNavbar";
import BusinessFooter from "../../components/footer/BusinessFooter";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function BusinessLayout({ children }) {
  const location = useLocation();
  const routesToHideFooter = [
    "/business/profiles/manage",
    "/business/profiles/add",
    "/business/profiles/edit",
    "/chatwithusers",
  ];
  const routesToHideProfileSwitch = [
    "/business/profiles/manage",
    "/choosebusiness",
  ];
  const routesToHideUserStatus = [
    "/business/video/add",
    "/business/video/editThumbnail",
    "/business/video/addDetail",
    "/business/video/addTags",
    "/business/video/uploadSuccess",
  ];
  return (
    <div className="business-layout">
      <BusinessNavbar
        hideProfileSwitch={routesToHideProfileSwitch.includes(
          location.pathname
        )}
      />
      <Box className="content-container">{children}</Box>
      {routesToHideFooter.includes(location.pathname) ? null : (
        <BusinessFooter
          pathname={location.pathname}
          routesToHideUserStatus={routesToHideUserStatus}
        />
      )}
    </div>
  );
}

export default BusinessLayout;
