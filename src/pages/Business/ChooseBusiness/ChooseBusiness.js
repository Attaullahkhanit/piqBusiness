import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ReactComponent as SmileImage } from "../../../assets/business/choosebusiness/Ellipse 256.svg";
import { ReactComponent as NoBusiness } from "../../../assets/business/choosebusiness/noBusiness.svg";
import { ReactComponent as PlusIcon } from "../../../assets/business/choosebusiness/plusicon.svg";
import zIndex from "@mui/material/styles/zIndex";
import profilePlaceholder from "../../../assets/business/home/profilePlaceholder.png";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessData } from "../../../redux/slices/businessProfileSlice";
import { messaging } from "../../../firebase/firebase";
import { getToken } from "firebase/messaging";
import { useNavigate } from "react-router-dom";
import { setfcmtoken } from "../../../redux/slices/allBusinessesSlice";

function ChooseBusiness() {
  const allUserBusinesses = useSelector((state) => state.auth.allBusinesses);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [allBusinesses, setAllBusinesses] = React.useState(allUserBusinesses);
  const localstorageuser = useSelector((state) => state.auth.user);
  const businessUser_id = localstorageuser.localId;
  const [fcm_token, setFcmToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectedBusiness = (index) => {
    // dispatch(setBusinessData(allBusinesses[index]));
    navigate(`/${allBusinesses[index].businessId}`);
  };

  useEffect(() => {
    getToken(messaging)
      .then((currentToken) => {
        if (currentToken) {
          setFcmToken(currentToken);
        } else {
          console.log("No FCM token available. Request permission.");
        }
      })
      .catch((error) => {
        console.error("Error getting FCM token:", error);
      });
    console.log({ businessUser_id, fcm_token });
    if (fcm_token !== "") {
      dispatch(setfcmtoken({ businessUser_id, fcm_token }));
    }
  }, [fcm_token]);

  useEffect(() => {
    console.log(allUserBusinesses);
    setAllBusinesses(allUserBusinesses);
  }, [allUserBusinesses]);
  return (
    <div className="choose-business-page">
      <div className="choose-container">
        <Typography className="title"> Hello there! 👋</Typography>
        <Typography className="subtitle">
          All your added business are shown here
        </Typography>
        <div className="form-list-container">
          {allBusinesses.length > 0 ? (
            allBusinesses.map((business, index) => (
              <div
                className="form-container"
                onClick={() => handleSelectedBusiness(index)}>
                <div className="list-item">
                  <div className="left-item">
                    <div className="image-container">
                      <img
                        src={
                          business.businessImageUrl.trim() !== "" &&
                          business.businessImageUrl
                            ? business.businessImageUrl
                            : profilePlaceholder
                        }
                        alt="business"
                      />
                    </div>
                    <div className="title-time">
                      <Typography className="title">
                        {business.businessName}
                      </Typography>
                      <Typography className="time">{business.city}</Typography>
                    </div>
                  </div>
                  <div
                    className={`right-item${
                      business.status !== "approved" ? "-review" : ""
                    }`}>
                    {business.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Box className="no-businesses-container">
              <NoBusiness />
              <Typography className="no-businesses-text">
                You don't have any businesses yet
              </Typography>
            </Box>
          )}
        </div>
        <Box className="button-container">
          <Box
            className="add-button-container"
            onClick={() => {
              navigate("/profiles/addBusiness/details");
            }}>
            <PlusIcon />
            <Typography className="text">Add New Business</Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ChooseBusiness;
