import React from "react";
import ProfileDetails from '../Details/index';
import AddProfileHeader from "../../../../components/ProfileDetailHeaders/AddProfile/AddProfileHeader";
export default function AddBusiness() {
  return (
    <div>
      <ProfileDetails header={<AddProfileHeader />} type={"add"} />
    </div>
  );
}
