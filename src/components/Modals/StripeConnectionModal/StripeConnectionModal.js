import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./styles.scss";
import { ReactComponent as StripeSVG } from "../../../assets/business/Wallet/stripe.svg";
import IconInput from "../../InputFields/IconInput/IconInput";
import PrimaryButton from "../../Buttons/Primary/PrimaryButton";
import stripeLogo from "../../../assets/business/Wallet/stripeLogo.png";
import OutlineButton from "../../Buttons/Outline/OutlineButton";
import { getUserInfo } from "../../../apis/wallet/getUserInfo";
import Loader from "../../Utils/Loader/Loader";
import saveBusinessToFirebase from "../../../apis/business/saveBusinessToFirebase";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessData } from "../../../redux/slices/businessProfileSlice";
import getSingleBusinessData from "../../../apis/business/getBusinessData";

export default function StripeConnectionModal({ handleClose, open }) {
  const [stripeID, setStripeID] = React.useState("");
  const [showField, setShowField] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [saveButtonLoading, setSaveButtonLoading] = React.useState(false);

  const [accountTitle, setAccountTitle] = React.useState("");
  const [error, setError] = React.useState("");
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
  const dispatch = useDispatch();

  const getStripeAccountDetails = () => {
    setLoading(true);
    getUserInfo(stripeID)
      .then((response) => {
        setAccountTitle(response.title);
        setShowField(false);
      })
      .catch((error) => {
        setError("Invalid Id");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = () => {
    setSaveButtonLoading(true);
    saveBusinessToFirebase(businessData?.id, {
      stripeId: stripeID,
      stripeAccountTitle: accountTitle,
    }).finally(() => {
      setSaveButtonLoading(false);
      dispatch(
        setBusinessData({
          ...businessData,
          stripeId: stripeID,
          stripeAccountTitle: accountTitle,
        })
      );
      handleClose();
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="stripe-connection-modal"
    >
      <Box className="modal-content">
        <StripeSVG className="stripe-svg" />
        <Typography className="title">
          {showField ? "Connect with Stripe Account" : "Confirm Stripe Details"}
        </Typography>
        {showField ? (
          <div className="details-area">
            <Typography className="field-title">Stripe ID</Typography>
            <IconInput
              placeholder={"Enter Your Stripe ID"}
              value={stripeID}
              onChange={(e) => setStripeID(e.target.value)}
            />
            <div className="button-area">
              <PrimaryButton
                text={loading ? <Loader loading={true} /> : "Connect"}
                styles={{ maxWidth: "250px" }}
                onClick={getStripeAccountDetails}
              />
            </div>
            {error.length > 0 && (
              <Typography className="error">{error}</Typography>
            )}
          </div>
        ) : (
          <div className="stripe-details-area">
            <div className="details-card">
              <div className="left-area">
                <img
                  src={stripeLogo}
                  alt="stripe-logo"
                  className="stripe-logo"
                />
              </div>
              <div className="right-area">
                <div className="detail-container">
                  <Typography className="field-title">Stripe ID</Typography>
                  <Typography className="field-value">{stripeID}</Typography>
                </div>
                <div className="detail-container">
                  <Typography className="field-title">Account Title</Typography>
                  <Typography className="field-value">
                    {accountTitle}
                  </Typography>
                </div>
                <div className="detail-container">
                  <Typography className="field-title">
                    Default Currency
                  </Typography>
                  <Typography className="field-value">USD</Typography>
                </div>
              </div>
            </div>
            <div className="button-area">
              <OutlineButton
                text={"Change"}
                onClick={() => setShowField(true)}
              />
              <PrimaryButton
                text={saveButtonLoading ? <Loader loading={true} /> : "Confirm"}
                onClick={handleSave}
              />
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
}
