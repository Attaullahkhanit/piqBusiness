import axios from "axios";
import { PIQ_BASE_URL } from "../variables";
export const getWalletDetails = (business_id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${PIQ_BASE_URL}/business/get-business-wallet-details?businessId=${business_id}`
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
