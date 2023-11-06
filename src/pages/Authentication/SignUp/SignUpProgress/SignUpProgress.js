import React from "react";
import "./styles.scss";
import { Grid, Typography } from "@mui/material";
import { ReactComponent as TickIcon } from "../../../../assets/business/authentication/SignupProgress/tick.svg";
import { ReactComponent as RightArrow } from "../../../../assets/business/authentication/SignupProgress/arrow-small-right.svg";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import { Box } from "@mui/system";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";

function SignUpProgress() {
  return (
    <div className="signup-progress-page">
      <div className="progress-container">
        <Typography className="title"> Hello there! 👋</Typography>
        <Typography className="subtitle">
          Let’s start by confirming your information.
        </Typography>
        <div className="form-container">
          <Grid item xs={12} className="list-item">
            <div className="left-item">
              <div className="index-number">1</div>
              <div className="title-time">
                <Typography className="title">Confirm Information</Typography>
                <Typography className="time">~ 1 minutes</Typography>
              </div>    
            </div>
            <div className="right-item">
              <TickIcon />
            </div>
          </Grid>
        </div>
        <div className="form-container">
          <Grid item xs={12} className="list-item">
            <div className="left-item">
              <div className="index-number">2</div>
              <div className="title-time">
                <Typography className="title">Build your Profile</Typography>
                <Typography className="time">~ 5 minutes</Typography>
              </div>
            </div>
            <div className="right-item">
              <RightArrow />
            </div>
          </Grid>
        </div>
        <div className="form-container">
          <Grid item xs={12} className="list-item">
            <div className="left-item">
              <div className="index-number">3</div>
              <div className="title-time">
                <Typography className="title">Add Video Content</Typography>
                <Typography className="time">~ 0 of 6 uploaded</Typography>
              </div>
            </div>
            <div className="right-item">
              <RightArrow />
            </div>
          </Grid>
        </div>
        <div className="form-container">
          <Grid item xs={12} className="list-item">
            <div className="left-item">
              <div className="index-number">4</div>
              <div className="title-time">
                <Typography className="title">Choose a plan</Typography>
                <Typography className="time">~ 1 minutes</Typography>
              </div>
            </div>
            <div className="right-item">
              <RightArrow />
            </div>
          </Grid>
        </div>
        <div className="submit-button-container">
          <PrimaryButton disabled text="Complete Setup" />
        </div>
      </div>
    </div>
  );
}

export default SignUpProgress;
