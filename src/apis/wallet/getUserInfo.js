import axios from "axios";
import { PIQ_BASE_URL } from "../variables";
export const getUserInfo = (account_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${PIQ_BASE_URL}/business/get-customer-info?account_id=${account_id}`
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  });
};
