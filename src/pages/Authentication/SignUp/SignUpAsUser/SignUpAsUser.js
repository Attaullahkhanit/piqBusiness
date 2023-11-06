import React, { useEffect, useState } from "react";
import "./styles.scss";
import PrimaryButton from "../../../../components/Buttons/Primary/PrimaryButton";
import IconInput from "../../../../components/InputFields/IconInput/IconInput";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HiddenToggle } from "../../../../assets/admin/common/hidden.svg";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { showErrorToast, showSuccessToast } from "../../../../utils/showToast";
import { register } from "../../../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/Utils/Loader/Loader";

function SignUpAsUser() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const EMAIL_VALIDATOR = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSignUp = () => {
    if (password === confirmPassword) {
      if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        showErrorToast("Please fill all the fields");
      } else {
        if (!EMAIL_VALIDATOR.test(email)) {
          showErrorToast("Please enter valid email");
        } else {
          dispatch(register({ name, email, password }));
        }
      }
    } else {
      showErrorToast("Passwords don't match");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/chooseBusiness");
      showSuccessToast("log in successful");
    }
  }, [isLoggedIn]);
  return (
    <div className="signup-user-page">
      <div className="signup-content">
        <h1 className="title-heading">Sign Up</h1>
        <h2 className="subheading">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </span>
        </h2>
        <div className="value-fields">
          <h3>Name</h3>
          <IconInput
            className="input-field"
            type="text"
            placeholder="Enter Here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h3>Email</h3>
          <IconInput
            className="input-field"
            type="email"
            placeholder="Enter Here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3>Password</h3>
          <IconInput
            type={showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-field"
            icon={
              showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )
            }
            position={"right"}
            onIconClick={togglePasswordVisibility}
          />
          <h3>Confirm Password</h3>
          <IconInput
            type={showConfirmPassword ? "password" : "text"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="password-field"
            icon={
              showConfirmPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )
            }
            position={"right"}
            onIconClick={toggleConfirmPasswordVisibility}
          />
        </div>
        <div className="button-container">
          <Loader loading={loading}>
            <PrimaryButton
              styles={{ maxWidth: "250px", zIndex: 3 }}
              text={"Sign Up"}
              onClick={handleSignUp}
            />
          </Loader>
        </div>
        <h4>
          Questions?{" "}
          <span style={{ textDecoration: "underline", color: "#ffda46" }}>
            Chat with us.
          </span>
        </h4>
      </div>
    </div>
  );
}

export default SignUpAsUser;
