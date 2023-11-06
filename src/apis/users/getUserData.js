import { PIQ_BASE_URL } from "../variables";
import axios from "axios";

const getUserData = (user_id) => {
  return new Promise((resolve, reject) => {
    const URL = `${PIQ_BASE_URL}/users/get-user?user_id=${user_id}`;
    axios
      .get(URL)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getUserData;
