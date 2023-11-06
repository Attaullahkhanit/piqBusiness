import axios from "axios";
import { v3 as uuidv3 } from "uuid";
export const generateQRCode = (businessId) => {
  const uuid = uuidv3(businessId, uuidv3.URL);
  console.log(uuid);
  const url = `https://quickchart.io/qr`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        text: "www.piq.com/29304jkkdfj2",
        format: "base64",
        size: 400,
        centerImageUrl:
          "https://firebasestorage.googleapis.com/v0/b/project-piq.appspot.com/o/images%2FGroup%20950683728.png?alt=media",
      })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
