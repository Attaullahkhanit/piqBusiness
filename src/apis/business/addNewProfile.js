import addAsset from "../assets/addAsset";
import { PIQ_BASE_URL } from "../variables";
import axios from "axios";
const addNewProfile = async (profile, userId) => {
  const URL = PIQ_BASE_URL + "business/add-business";
  return new Promise((resolve, reject) => {
    const assetPromises = profile.videoContent.map((item) => {
      return addAsset(refactorContentData(item, profile.profileInformation));
    });
    Promise.all(assetPromises).then((res) => {
      const data = {
        ...refactorProfileData(profile.profileInformation),
        businessUserId: userId,
      };
      data.businessAssets = [];
      res.forEach((item) => {
        data.businessAssets.push(item.data);
      });
      axios
        .post(URL, data)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export default addNewProfile;

const refactorContentData = (data, profileData) => {
  const newData = {
    assetId: data.id,
    assetName: data.title,
    description: data.description,
    directTo: data.directTo,
    videoUrl: data.firebaseUrl || "",
    price: parseFloat(data.price),
    ownerTags: data.tags,
    duration: 0,
    creator: profileData.name,
    thumbnail: data.thumbnailFirebaseUrl,
    assetType: data.videoType,
    businessId: data.businessId,
  };
  return newData;
};

const refactorProfileData = (data) => {
  console.log(data, "data");
  const operationalData = data.timing.map((item) => {
    return {
      status: item.status,
      startingTime: item.open,
      closingTime: item.close,
      weekday: item.weekday,
    };
  });
  return {
    about: data?.about,
    address: data?.location?.address,
    location: [
      data?.location?.coordinates?.lat,
      data?.location?.coordinates?.lng,
    ],
    coverPhoto: data?.backgroundFirebaseUrl,
    subCategories: data?.categories?.split(",") || [],
    businessEmail: data?.email,
    businessName: data?.name,
    businessinstagram: data?.instagram,
    businessAssets: data?.businessAssets || [],
    status: "pending",
    businessPhone: data?.phone,
    businessImageUrl: data?.profileImageFirebaseUrl,
    operationalData,
    businessWebsite: data?.website,
    subscriptionType: "",
    establishmentType: data?.establishmentType || "restaurant",
  };
};
