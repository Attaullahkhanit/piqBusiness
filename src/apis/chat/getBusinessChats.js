import { PIQ_BASE_URL } from "../variables";
import axios from "axios";

const getBusinessChats = (business_id) => {
  const URL = `${PIQ_BASE_URL}/chat/get-business-chats`;
  return new Promise((resolve, reject) => {
    axios
      .post(URL, {
        business_id,
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getBusinessChats;
