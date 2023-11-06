import React, { useEffect } from "react";
import "./styles.scss";
import { ReactComponent as Send } from "../../assets/business/chatbot/send.svg";
import { Box, Button, InputBase, Typography } from "@mui/material";

function ChatBot({
  chatData,
  chatInputValue,
  setChatInputValue,
  handleSend,
  chatSending,
}) {
  useEffect(() => {
    const chatBox = document.getElementById(
      `chat-box-${chatData?.messages?.length - 1}`
    );
    if (chatBox) {
      chatBox.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, [chatData]);

  return (
    <div className="chat-bot">
      <Box className="header">
        <Box>
          <img src={chatData?.profile_photo} className="header-photo" />
        </Box>
        <Box>
          <Typography className="name">{chatData?.user_name}</Typography>
        </Box>
      </Box>
      <Box className="replies-container">
        {/* <Typography className="reply-date">June 2, 2023</Typography> */}
        {chatData?.messages?.map((item, index) => {
          if (item?.by_user) {
            if (
              index !== chatData?.messages.length &&
              !chatData?.messages[index + 1]?.by_user
            ) {
              return (
                <Box className="user-container-last" id={`chat-box-${index}`}>
                  <img src={chatData?.profile_photo} className="reply-image" />
                  <Typography className="message">{item?.message}</Typography>
                </Box>
              );
            } else {
              return (
                <Box className="user-container" id={`chat-box-${index}`}>
                  <Typography className="message">{item?.message}</Typography>
                </Box>
              );
            }
          } else {
            return (
              <Box className="business-container" id={`chat-box-${index}`}>
                <Typography className="message">{item?.message}</Typography>
              </Box>
            );
          }
        })}
      </Box>
      <Box className="type-message">
        <Box className="type-container">
          <Box className="type-input">
            <InputBase
              sx={{ ml: 3 }}
              fullWidth
              placeholder="Type here"
              inputProps={{ "aria-label": "Type here" }}
              value={chatInputValue}
              onChange={(e) => {
                setChatInputValue(e.target.value);
              }}
            />
          </Box>
          <Box>
            <Button
              className="send-button"
              variant="contained"
              startIcon={<Send />}
              onClick={handleSend}
              disabled={chatSending}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ChatBot;
