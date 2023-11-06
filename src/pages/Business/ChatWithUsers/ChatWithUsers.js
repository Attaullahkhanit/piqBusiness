import React, { useState } from "react";
import { useEffect } from "react";
import "./styles.scss";
import { ReactComponent as NoChats } from "../../../assets/business/choosebusiness/noBusiness.svg";
import { Box, Grid, Typography } from "@mui/material";
import { usersData } from "./UsersDummyData";
import ChatBot from "../../../components/ChatBot/ChatBot";
import { useSelector } from "react-redux";
import getBusinessChats from "../../../apis/chat/getBusinessChats";
import getUserData from "../../../apis/users/getUserData";
import Loader from "../../../components/Utils/Loader/Loader";
import dummyImage from "../../../assets/business/home/profilePlaceholder.png";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase/firebase";
import { timeAgo } from "../../../utils/getTimeAgo";
import { sendMessageToUser } from "../../../apis/chat/sendMessageToUser";

function ChatWithUsers() {
  const [chatLoading, setChatLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [allChatsData, setAllChatsData] = useState([]);
  const [chatInputValue, setChatInputValue] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const businessData = useSelector(
    (state) => state.businessProfile.businessData
  );

  const handleSend = () => {
    setChatSending(true);
    sendMessageToUser(chatData?.user_id, chatData?.business_id, chatInputValue)
      .then((data) => {
        setChatData({
          ...chatData,
          messages: [
            ...chatData.messages,
            { message: chatInputValue, by_user: false },
          ],
        });
        setChatInputValue("");
        setChatSending(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getChats = () => {
    setChatLoading(true);
    var allChats,
      usersData = [];

    getBusinessChats(businessData?.id)
      .then((data) => {
        allChats = data;
        const userDataPromises = [];
        data.map((item) => {
          userDataPromises.push(getUserData(item.user_id));
        });
        Promise.all(userDataPromises).then((data) => {
          const allChatsData = [];
          for (let i = 0; i < allChats.length; i++) {
            for (let j = 0; j < data.length; j++) {
              const user = data[j];
              if (user.id === allChats[i].user_id) {
                allChatsData.push({
                  ...allChats[i],
                  ...user,
                });
              }
            }
          }
          setAllChatsData(allChatsData);
          setChatData(allChatsData[0]);
          setChatLoading(false);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    console.log(allChatsData);
  }, [allChatsData]);
  return (
    <div className="chat-with-users-page">
      {businessData ? 
      <Loader loading={chatLoading}>
        {allChatsData.length > 0 ? (
          <Box className="chat-container" id="content-cards-container">
            <Grid container>
              <Grid xs={4.5} className="users-messages-list-container">
                <Box className="list-items">
                  <Typography className="list-title">Messages</Typography>
                  {allChatsData.map((item, index) => (
                    <>
                      <Box
                        className="items-container"
                        onClick={() => {
                          setChatData(allChatsData[index]);
                        }}>
                        <Box className="items">
                          <Box className="left-area-item">
                            <Box className="profile-image">
                              <img src={item?.profile_photo} alt="profile" />
                            </Box>
                            <Box className="name-message">
                              <Typography className="name">
                                {item?.user_name}
                              </Typography>
                              <Typography className="reply">
                                {
                                  item?.messages[item?.messages.length - 1]
                                    ?.message
                                }
                              </Typography>
                            </Box>
                          </Box>
                          <Box className="right-area-item">
                            <Typography className="time">
                              {timeAgo(
                                item?.messages[item?.messages.length - 1]
                                  ?.timestamp
                              )}
                            </Typography>
                            <Typography>{item.tickIcon}</Typography>
                          </Box>
                        </Box>
                      </Box>
                      <hr className="items-bottom-hr" />
                    </>
                  ))}
                </Box>
              </Grid>
              <Grid xs={7} className="user-chat-bot">
                <ChatBot
                  chatData={chatData}
                  chatInputValue={chatInputValue}
                  setChatInputValue={setChatInputValue}
                  handleSend={handleSend}
                  chatSending={chatSending}
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <div className="no-chats">
            <NoChats />
            <Typography className="no-chats-placeholder">
              No Chats Yet
            </Typography>
          </div>
        )}
      </Loader>: 
      <div className='no-business-section'>
        <div className="message">Add a business first to view business chats</div>
        </div>
      }
    </div>
  );
}

export default ChatWithUsers;
