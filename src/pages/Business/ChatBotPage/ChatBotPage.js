import React from "react";
import "./styles.scss";
import { Box, Grid } from "@mui/material";
import { ReactComponent as Sophia } from "../../../assets/business/chatwithusers/profile4.svg";
import ChatBot from "../../../components/ChatBot/ChatBot";

function ChatBotPage() {
  return (
    <div className="chat-bot-page">
      <Box className="bot-container" id="bot-cards-container">
        <Grid xs={12} className="user-chat-bot">
          <ChatBot profileImage={<Sophia />} />
        </Grid>
      </Box>
    </div>
  );
}

export default ChatBotPage;
