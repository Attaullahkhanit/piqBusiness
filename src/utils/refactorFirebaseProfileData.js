const refactorFirebaseProfileData = (mainData) => {
  const refactoredData = [];
  mainData.forEach((data) => {
    const operationalData = data?.operationalData
      ? data?.operationalData?.map((item) => {
          return {
            status: item.status,
            open: item.startingTime,
            close: item.closingTime,
            weekday: item.weekday,
          };
        })
      : [];
    refactoredData.push({
      id: data.id,
      businessImage: data.businessImageUrl,
      profileImage: data.businessImageUrl,
      profileBackground: data.coverPhoto,
      type: data.establishmentType,
      title: data.businessName,
      tags: data.subCategories || [],
      category: "Sneak Piq",
      added: "25th May 2021",
      views: "1,000",
      shares: "1,000",
      saves: "1,000",
      impressions: "1,000",
      comments: "1,000",
      status: data.status,
      name: data.businessName,
      email: data.businessEmail,
      phone: data.businessPhone,
      website: data.businessWebsite,
      about: data.about,
      location: data.address,
      coverPhoto: data.coverPhoto,
      book: data.book,
      offering: data.offerings,
      order: data.order,
      operationalData,
    });
  });
  return refactoredData;
};

export default refactorFirebaseProfileData;
