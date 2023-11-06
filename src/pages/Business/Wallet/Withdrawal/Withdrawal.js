import React from "react";
import "./styles.scss";
import { Typography } from "@mui/material";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
export default function Withdrawal() {
  return (
    <div className="wallet-withdrawal">
      <div className="withdrawal-content-area">
        <Typography className="title">Withdraw</Typography>
        <Typography className="subtitle">
          Payouts are typically available within 3 business days. If you need
          assistance, contact our support team. Taxes and fees may apply.
        </Typography>
        <div className="withdrawal-form">
          <input type="number" placeholder="$0.00" />
          <Typography className="balance-text">Balance: $230K</Typography>
          <div className="button-container">
            <PrimaryButton text={"Withdraw"} styles={{width:"250px"}}/>
          </div>
        </div>
      </div>
    </div>
  );
}
