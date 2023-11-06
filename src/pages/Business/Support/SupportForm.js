import React, { useState } from "react";
import "./styles.scss";

import { Box, Typography } from "@mui/material";
import { ReactComponent as EnvelopeIcon } from "../../../assets/admin/password/envelope.svg";
import { ReactComponent as CommentIcon } from "../../../assets/admin/password/comment-dots.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/admin/password/phone.svg";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/Buttons/Primary/PrimaryButton";
import IconInput from "../../../components/InputFields/IconInput/IconInput";
import PhoneNumberInput from "../../../components/PhoneNumber/PhoneNumberInput";
import MultilineInput from "../../../components/InputFields/MultilineInput/MultilineInput";

function Support() {
  const navigate = useNavigate();
  const [selectedBox, setSelectedBox] = useState("chat");
  const [phoneNumber, setPhoneNumber] = useState(""); // State to store the phone number
        const handlePhoneNumberChange = (value) => {
          setPhoneNumber(value);
        };

  const handleBoxClick = (boxName) => {
    setSelectedBox(boxName);

  };

  const renderContent = () => {
    switch (selectedBox) {
      case "chat":
        return (
          <>
            <h3>Subject</h3>
            <IconInput placeholder={"Enter Here"} />
            <h3>How can we help you?</h3>
            <MultilineInput
              placeholder={"Enter Message Here"}
              className="multiline-input-container"
            />
            <div className="button-container">
            <PrimaryButton
              styles={{ maxWidth: "280px", zIndex: 3 }}
              text="Open Chat"
              onClick={() => {
                navigate("/support/chat");
              }}
            />
            </div>
          </>
        );
      case "email":
        return (
          <>
            <h3>Subject</h3>
            <IconInput placeholder={"Enter Email Subject"} />

            <h3>Full Name</h3>
            <IconInput placeholder={"Enter Here"} />
            <h3>Phone Number</h3>
            <div className="number-input">
            <PhoneNumberInput
                  placeholder="Enter Here"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
              />
            </div>
            
            <h3>Email</h3>
            <IconInput placeholder={"Enter Here"} />

            <h3>How can we help you?</h3>
            <MultilineInput
              placeholder={"Enter Email Message"}
              className="multiline-input-container"
            />
            <div className="button-container">
            <PrimaryButton
              styles={{ maxWidth: "280px", zIndex: 3 }}
              text="Submit"
              onClick={() => {
                navigate("/support/verification");
              }}
            />
            </div>
          </>
        );
      case "call":
        return (
          <>
            <h3>Subject</h3>
            <IconInput placeholder={"Enter Email Subject"} />

            <h3>Full Name</h3>
            <IconInput placeholder={"Enter Here"} />
            <h3>Phone Number</h3>
            <div className="number-input">
            <PhoneNumberInput
                  placeholder="Enter Here"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
              />
            </div>
            <h3>Email</h3>
            <IconInput placeholder={"Enter Here"} />

            <h3>How can we help you?</h3>
            <MultilineInput
              placeholder={"Enter Email Message"}
              className="multiline-input-container"
            />
            <div className="button-container">
            <PrimaryButton
              styles={{ maxWidth: "280px", zIndex: 3 }}
              text="Submit"
              onClick={() => {
                navigate("/support/verification");
              }}
            />
            </div>
          </>
        );
      default:
        return null;
        // Can add error handling or showcasing a 404 error e.t.c here.
    }
  };

  return (
    <div className="chat-support-container">
      <div className="chat-support-content">
        <h1 className="title-heading">Connect with our team</h1>
        <h2 className="subheading">We are happy to help and will be with you soon</h2>

        <h3 className="subheading-box">How would you like to be contacted?</h3>
        <div className="box-container">
          <Box
            className={`box-right ${
              selectedBox === "chat" ? "selected" : ""
            }`}
            onClick={() => handleBoxClick("chat")}
          >
            <CommentIcon className="box-icon" />
            <Typography className="box-title">Chat</Typography>
          </Box>

          <Box
            className={`box-left ${
              selectedBox === "email" ? "selected" : ""
            }`}
            onClick={() => handleBoxClick("email")}
          >
            <EnvelopeIcon className="box-icon" />
            <Typography className="box-title">Email</Typography>
          </Box>

          <Box
            className={`box-right ${
              selectedBox === "call" ? "selected" : ""
            }`}
            onClick={() => handleBoxClick("call")}
          >
            <PhoneIcon className="box-icon" />
            <Typography className="box-title">Call</Typography>
          </Box>
        </div>

        <div className="value-fields">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Support;
