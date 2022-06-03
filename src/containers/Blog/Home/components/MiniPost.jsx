import React from "react";
import test from "../../../../assets/test.jpg";

const MiniPost = ({ title, resume, _id, createdAt }) => {
  return (
    <div className="shadow-lg rounded-lg h-full">
      <img
        src={test}
        alt={title}
        className="object-cover h-[200px] w-full rounded-tl-lg rounded-tr-lg"
      />

      <div className="flex flex-col px-7 py-4 justify-center text-base space-y-3">
        <h1 className="mb-0 font-bold  ">{title}</h1>

        <div className="flex justify-between items-center text-sm">
          <div className="rounded-full bg-second_color text-white py-2 px-6">
            Buenas
          </div>

          <p className="mb-0 text-gray-400">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default MiniPost;
