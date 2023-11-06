import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Typography } from "@mui/material";
import { ReactComponent as DepositIcon } from "../../../assets/business/Wallet/deposit.svg";
import { ReactComponent as WithdrawIcon } from "../../../assets/business/Wallet/withdraw.svg";
import { ReactComponent as BankIcon } from "../../../assets/business/Wallet/bank.svg";
import { ReactComponent as EditIcon } from "../../../assets/business/Wallet/edit.svg";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import searchIcon from "../../../assets/business/home/searchGrey.png";

import TransactionCard from "../../../components/cards/TransactionCard/TransactionCard";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import { ReactComponent as StripeSVG } from "../../../assets/business/Wallet/stripe.svg";
import StripeConnectionModal from "../../../components/Modals/StripeConnectionModal/StripeConnectionModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getWalletDetails } from "../../../apis/wallet/getWalletDetails";
export default function Wallet() {
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );
  console.log(businessData, 'businessDataaaa')
  const [searchValue, setSearchValue] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [stripeConnected, setStripeConnected] = useState(
    businessData?.stripeId == null ? "welcome to stripe please first you make your business account" : businessData?.stripeId
  );
  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [walletData, setWalletData] = useState();
  const tabs = ["Earnings", "Withdrawls"];
  const navigate = useNavigate();

  useEffect(() => {
    if (businessData?.stripeAccountTitle) {
      setStripeConnected(true);
    } else {
      setStripeConnected(false);
    }
  }, [businessData]);

  useEffect(() => {
    if (stripeConnected) {
      getWalletDetails(businessData?.id).then((response) => {
        setWalletData(response);
      });
    }
  }, [stripeConnected]);
  return (
    <div className="wallet">
      <StripeConnectionModal
        handleClose={() => setStripeModalOpen(false)}
        open={stripeModalOpen}
      />
      {stripeConnected && walletData ? (
        <div className="wallet-content-area">
          <Typography className="title">Wallet</Typography>

          <div className="balance-card">
            <div className="balance-area">
              <Typography className="balance-title">Balance</Typography>
              <Typography className="balance-amount">
                $ {walletData?.balance}
              </Typography>
            </div>
            <div className="actions-area">
              {/* <div className="action">
              <DepositIcon className="action-icon" />
              <Typography className="action-title">Deposit</Typography>
            </div> */}
              <div
                className="action"
                onClick={() => navigate("/wallet/withdrawal")}
              >
                <WithdrawIcon className="action-icon" />
                <Typography className="action-title">Withdraw</Typography>
              </div>
            </div>
          </div>
          <div className="account-detail">
            <Typography className="title">Account Details</Typography>
            <div className="detail-card">
              <div className="details-area">
                <div className="icon-container">
                  <BankIcon className="icon" />
                </div>
                <div className="detail-container">
                  <Typography className="detail-title">
                    {businessData.stripeAccountTitle}
                  </Typography>
                </div>
              </div>
              <div className="actions-area">
                <EditIcon className="action-icon" />
              </div>
            </div>
          </div>
          <div className="transaction-details-area">
            <Typography className="title">Transaction</Typography>
            <div className="tab-header-container">
              {tabs.map((tab, index) => (
                <div
                  className={`tab-header ${
                    selectedTab === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab(index)}
                >
                  <Typography className="tab-title">{tab}</Typography>
                </div>
              ))}
            </div>
            <div className="search-container">
              <IconInput
                icon={searchIcon}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.values)}
                placeholder={"Search"}
              />
            </div>
            <div className="transaction-list">
              {selectedTab === 0
                ? walletData?.earnings?.map((item) => (
                    <TransactionCard
                      type={item.type}
                      price={"+$" + item.amount}
                      title={item.title}
                      date={item.date}
                    />
                  ))
                : walletData?.withdrawals?.map((item) => (
                    <TransactionCard
                      price={"-$" + item.amount}
                      date={item.date}
                    />
                  ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="wallet-content-area">
          <Typography className="title">Wallet</Typography>
          <div className="stripe-container">
            <StripeSVG className="stripe-svg" />
            <Typography className="description">
              Connect Your Stripe Account
            </Typography>
          </div>
          <PrimaryButton
            text={"Connect Stripe"}
            onClick={() => setStripeModalOpen(true)}
          />
        </div>
      )}
    </div>
  );
}
