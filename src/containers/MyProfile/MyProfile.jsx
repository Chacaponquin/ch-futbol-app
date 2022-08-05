import React from "react";
import ProfileSection from "./components/ProfileSection";

const MyProfile = () => {
  return (
    <div className="flex w-full px-20">
      <div className="flex w-full">
        <div className="w-[70%]"></div>
        <ProfileSection />
      </div>
    </div>
  );
};

export default MyProfile;
