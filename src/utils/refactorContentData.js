const refactorContentData = (data) => {
  const newData = {
    assetId: data.id,
    assetName: data.title,
    description: data.description,
    directTo: data.directTo,
    videoUrl: data.firebaseUrl,
    price: data.price,
    ownerTags: data.tags,
    thumbnail: data.thumbnailFirebaseUrl,
    assetType: data.videoType,
    createdAt: new Date().toISOString(),
    saves: getRandomInt(0, 100),
    shares: getRandomInt(0, 100),
    views: getRandomInt(0, 100),
    status: "pending",
    businessId: data.businessId,
  };
  console.log(newData);
  return newData;
};
export default refactorContentData;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
