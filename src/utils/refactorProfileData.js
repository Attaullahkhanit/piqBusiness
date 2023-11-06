const refactorProfileData = (data) => {
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
    address: data?.location,
    coverPhoto: data?.backgroundFirebaseUrl,
    book: data?.book,
    subCategories: data?.categories.split(","),
    businessEmail: data?.email,
    businessName: data?.name,
    businessinstagram:data?.instagram,
    status: "pending",
    businessPhone: data?.phone,
    businessImageUrl: data?.profileImageFirebaseUrl,
    operationalData,
    businessWebsite: data?.website,
    establishmentType: data?.establishmentType || "restaurant",
  };
};

export default refactorProfileData;
