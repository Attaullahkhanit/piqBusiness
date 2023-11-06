import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

export const sendMessageToUser = (user_id, business_id, message) => {
  const URL = `${PIQ_BASE_URL}/chat/send-message-to-user`;
  return new Promise((resolve, reject) => {
    axios
      .post(URL, {
        user_id,
        business_id,
        message,
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
