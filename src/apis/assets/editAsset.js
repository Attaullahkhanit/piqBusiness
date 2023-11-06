import axios from "axios";
import { PIQ_BASE_URL } from "../variables";

export const editAsset = async (assetId, assetData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PIQ_BASE_URL}/assets/update-asset`, {
        assetId,
        data: assetData,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
