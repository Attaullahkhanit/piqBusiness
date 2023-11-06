import { Grid, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as RingBell } from "../../../assets/notification/bell-ring.svg";
import { ReactComponent as Bell } from "../../../assets/notification/bell.svg";
import "./styles.scss";

function NotificationScreen() {
  return (
    <div className="notification-page">
      <div className="notification-container">
        <Typography className="top-title">Notifications</Typography>
        <Typography className="day-title">Today</Typography>
        <div className="form-container">
          <Grid item xs={12} className="list-item">
            <div className="list-container">
              <div className="item-icon">
                <RingBell />
              </div>
              <div className="item-text">
                <Typography className="title">
                  New businesses and experiences near you!
                </Typography>
                <Typography className="text">See what’s up. </Typography>
              </div>
            </div>
          </Grid>
        </div>
        <div className="form-container">
          <Grid item xs={12} className="list-item">
            <div className="list-container">
              <div className="item-icon">
                <RingBell />
              </div>
              <div className="item-text">
                <Typography className="title">piq the best nearby!</Typography>
                <Typography className="text">
                  Last login: Apr 23, 2023
                </Typography>
              </div>
            </div>
          </Grid>
        </div>
        <div className="form-container">
          <Grid item xs={12} className="list-item">
            <div className="list-container">
              <div className="item-icon">
                <Bell />
              </div>
              <div className="item-text">
                <Typography className="title">
                  The Beverly (Downtown) has something new!
                </Typography>
                <Typography className="text">
                  Tap here to see what’s up.{" "}
                </Typography>
              </div>
            </div>
          </Grid>
        </div>
        <Typography className="day-title">Yesterday</Typography>
        <div className="form-container">
          <Grid item xs={12} className="list-item">
            <div className="list-container">
              <div className="item-icon">
                <Bell />
              </div>
              <div className="item-text">
                <Typography className="title">See you soon!</Typography>
                <Typography className="text">
                  Please check-in with door person at (Venue).
                </Typography>
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default NotificationScreen;
