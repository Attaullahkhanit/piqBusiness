import { Box, Grid, Typography } from "@mui/material";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/auth";
import Loader from "../../../components/Utils/Loader/Loader";
import { showErrorToast, showSuccessToast } from "../../../utils/showToast";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const localstorageuser = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const EMAIL_VALIDATOR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  const handleSubmit = () => {
    if (email.trim() === "" || password.trim() === "") {
      showErrorToast("Please fill all the fields");
    } else {
      if (!EMAIL_VALIDATOR.test(email)) {
        showErrorToast("Please enter valid email");
      } else {
        dispatch(login({ email, password}));
      }
    }
  };

  useEffect(() => {
    if (error !== "") {
      showErrorToast(error);
    }
  }, [error]);
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/choosebusiness");
      showSuccessToast("log in successful");
    }
  }, [isLoggedIn]);

  return (
    <div className="signin-page">
      <div className="signin-content-area">
        <Typography className="title"> Welcome back.</Typography>
        <Typography className="subtitle">
          Don’t have a business account?
          <span
            className="subtitle-span"
            onClick={() => {
              navigate("/signup/business");
            }}
          >
            Apply here
          </span>
        </Typography>
        <div className="form-container">
          <Grid item xs={12} className="form-subcontainer">
            <Typography className="form-label">
              Username, Email, or Phone Number
            </Typography>
            <IconInput
              placeholder="Enter Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className="form-subcontainer">
            <Typography className="form-label">Password</Typography>
            <IconInput
              className="icon-input-container"
              placeholder="Enter Here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )
              }
              position={"right"}
              type={showPassword ? "password" : "text"}
              onIconClick={() => setShowPassword(!showPassword)}
            />
          </Grid>
          <Link className="form-forgot-password">Forgot Password?</Link>
        </div>
        <div className="submit-button-container">
          <Loader loading={loading}>
            <PrimaryButton text="Continue" onClick={handleSubmit} />
          </Loader>
        </div>
        <Typography className="form-bottom-text">
          Questions? <span className="form-bottom-text-span">Chat with us</span>
        </Typography>
      </div>
    </div>
  );
}

export default Signin;
