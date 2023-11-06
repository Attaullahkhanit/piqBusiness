import React from "react";
import "./styles.scss";
import { ReactComponent as Coin } from "../../../assets/business/Wallet/coin.svg";
import { Typography } from "@mui/material";

export default function TransactionCard({ title, date, price, type }) {
  return (
    <div className="transaction-card">
      <div className="transaction-card-left">
        <Coin className="coin-icon" />
        <div className="transaction-details">
          {title && (
            <Typography className="transaction-title">{title}</Typography>
          )}
          <Typography className="transaction-date">{date}</Typography>
        </div>
      </div>
      <div className="transaction-card-right">
        <Typography className={title ? "transaction-amount":"transaction-amount-red"}>{price}</Typography>
        {type && <Typography className="transaction-type">{type}</Typography>}
      </div>
    </div>
  );
}
