import React from "react";
import image from "../../../assets/test.jpg";
import Icon from "supercons";

const ProfileSection = () => {
  return (
    <div className="w-[30%] border-2 rounded-md flex flex-col py-4 px-8">
      <h1 className="font-bold text-3xl text-center">My Profile</h1>

      <div className="flex justify-center w-full">
        <img
          src={image}
          alt=""
          className="object-cover w-[220px] h-[200px] rounded-lg"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl mb-0">Antonio Orosco</h1>
        <div className="flex items-center">
          <p className="mb-0 text-gray-400 font-bold">Manager</p>
          <Icon glyph="admin" />
        </div>

        <div className="flex items-center gap-3 text-base">
          <button className="border-2 border-primary_color text-primary_color rounded-md py-1 px-4 flex items-center gap-3">
            <Icon glyph="attachment" size={28} />
            <p className="mb-0 font-bold">Edit Profile</p>
          </button>

          <button className="bg-primary_color text-white font-bold py-1 px-4 rounded-md border-2 border-primary_color">
            Upgrade
          </button>
        </div>

        <div className="h-[2px] w-full my-6 bg-gray-400"></div>
      </div>
    </div>
  );
};

export default ProfileSection;
