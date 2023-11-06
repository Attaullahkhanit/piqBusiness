import React from "react";
import "./styles.scss";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";

import { ReactComponent as Refer } from "../../../../assets/business/settings/referandearn.svg";
import { ReactComponent as Star } from "../../../../assets/business/settings/star.svg";
import { Typography } from "@mui/material";
import { generateQRCode } from "../../../../apis/common/generateQRCode";
import ReferralQRModal from "../../../../components/Modals/ReferralQRModal/ReferralQRModal";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Utils/Loader/Loader";
export default function Referral() {
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
  const [referralModalOpen, setReferralModalOpen] = React.useState(false);
  const [generateQrCodeLoading, setGenerateQrCodeLoading] =
    React.useState(false);
  const [qrBase64, setQRBase64] = React.useState("");
  const qrLink = "www.piq.com/" + businessData?.id;

  const handleGenerateQRCode = () => {
    setGenerateQrCodeLoading(true);
    generateQRCode(businessData?.id)
      .then((data) => {
        setQRBase64(data);
        setReferralModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGenerateQrCodeLoading(false);
      });
  };

  return (
    <div className="referral-page">
      <ReferralQRModal
        open={referralModalOpen}
        handleClose={() => setReferralModalOpen(false)}
        qr={qrBase64}
        link={qrLink}
      />
      <div className="referral-content">
        <h1 className="settings-heading">Refer to Earn</h1>
        <h2 className="subheading">
          Earn recurring income for each user you refer to our app. See our
          Terms of Service for details.
        </h2>
        <div className="refer-and-earn-image-container">
          <Refer className="refer-and-earn-image" />
        </div>

        <div className="ordered-list">
          <div className="bullet-list">
            <div className="bullet-item">
              <Star className="bullet-svg" />
              <Typography variant="body1" className="bullet-item-text">
                Connect to your Stripe Account (or sign up for Stripe)
              </Typography>
            </div>
            <div className="bullet-item">
              <Star className="bullet-svg" />
              <Typography variant="body1" className="bullet-item-text">
                Download your piq QR code to create signage for your customers.
                (Example: Stickers for menus and bill holders, or front door
                signage)
              </Typography>
            </div>
            <div className="bullet-item">
              <Star className="bullet-svg" />
              <Typography variant="body1" className="bullet-item-text">
                Display QRs in your business, embed in your website, and post
                piq referral divnks on your social medias.
              </Typography>
            </div>
            <div className="bullet-item">
              <Star className="bullet-svg" />
              <Typography variant="body1" className="bullet-item-text">
                Receive 20% of the revenue your referred users bring piq
              </Typography>
            </div>
          </div>
        </div>
        <div className="button-container">
          <PrimaryButton
            styles={{ maxWidth: "250px", zIndex: 3 }}
            text={
              generateQrCodeLoading ? (
                <Loader loading={true} />
              ) : (
                "Generate QR Code"
              )
            }
            onClick={() => handleGenerateQRCode()}
          />
        </div>
      </div>
    </div>
  );
}
