import React, { useState } from "react";
import "./styles.scss";
import { Box, Typography } from "@mui/material";
import { ReactComponent as Shopname } from "../../../../assets/business/authentication/shop.svg";
import { ReactComponent as Marker } from "../../../../assets/business/authentication/marker.svg";
import { ReactComponent as Phoneflip } from "../../../../assets/business/authentication/phone-flip.svg";
import { ReactComponent as Email } from "../../../../assets/business/authentication/envelope.svg";
import { ReactComponent as Linkicon } from "../../../../assets/business/authentication/link-alt.svg";
import { ReactComponent as Category } from "../../../../assets/business/authentication/category.svg";
import { ReactComponent as Price } from "../../../../assets/business/authentication/price-tag.svg";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import ConfirmDetailModal from "../../../../components/Modals/ConfirmDetailModal/ConfirmDetailModal";

function ConfirmDetail() {
  const [openPopup, setpopupopen] = useState(false);
  return (
    <div className="confirm-detail-container">
      <div className="confirm-topbar">
        <Typography className="title">Hello there! 👋</Typography>
        <Typography className="subtitle">
          Let’s start by confirming your information.
        </Typography>
        <div className="card">
          <Box className="list-item">
            <Box className="left-area">
              <Shopname />
              <Typography className="list-name">Name</Typography>
            </Box>
            <Box>
              <Typography className="right-area">
                Example Business and Company
              </Typography>
            </Box>
          </Box>
          <Box className="list-item">
            <Box className="left-area">
              <Marker />
              <Typography className="list-name">Location</Typography>
            </Box>
            <Box>
              <Typography className="right-area">
                11245 N. Hayden Rd. Scottsdale, AZ 85258
              </Typography>
            </Box>
          </Box>
          <Box className="list-item">
            <Box className="left-area">
              <Phoneflip />
              <Typography className="list-name">Phone</Typography>
            </Box>
            <Box>
              <Typography className="right-area">+55 555-555-5555</Typography>
            </Box>
          </Box>
          <Box className="list-item">
            <Box className="left-area">
              <Email />
              <Typography className="list-name">Email</Typography>
            </Box>
            <Box>
              <Typography className="right-area">
                contact@examplebusiness.com
              </Typography>
            </Box>
          </Box>
          <Box className="list-item">
            <Box className="left-area">
              <Linkicon />
              <Typography className="list-name">Website</Typography>
            </Box>
            <Box>
              <Typography className="right-area">examplebusiness.com</Typography>
            </Box>
          </Box>
          <Box className="list-item">
            <Box className="left-area">
              <Linkicon />
              <Typography className="list-name">Order</Typography>
            </Box>
            <Box>
              <Typography className="right-area">
                examplebusiness.com/order
              </Typography>
            </Box>
          </Box>
          <Box className="list-item">
            <Box className="left-area">
              <Linkicon />
              <Typography className="list-name">Book</Typography>
            </Box>
            <Box>
              <Typography className="right-area">
                examplebusiness.com/order
              </Typography>
            </Box>
          </Box>
          <Box className="list-item">
            <Box className="left-area">
              <Category />
              <Typography className="list-name">Category</Typography>
            </Box>
            <Box>
              <Typography className="right-area">
                Restaurant, Bar, Club
              </Typography>
            </Box>
          </Box>
          <Box className="list-item">
            <Box className="left-area">
              <Price />
              <Typography className="list-name">Offerings</Typography>
            </Box>
            <Box>
              <Typography className="right-area">
                Food, Drinks, Events, Experiences
              </Typography>
            </Box>
          </Box>
        </div>
        <div className="submit-button-container">
          <PrimaryButton
            text="Continue"
            onClick={() => setpopupopen(!openPopup)}
          />
        </div>
        <div className="confirm-bottom-container">
          <Typography className="span-text">
            To add to/edit this information:
          </Typography>
          <Typography>
            Contact our <span className="bottom-text">support team.</span>
          </Typography>
          <ConfirmDetailModal
            openPopup={openPopup}
            handleClose={() => setpopupopen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDetail;
