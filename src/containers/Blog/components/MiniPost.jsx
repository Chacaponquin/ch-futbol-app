import React from "react";
import test from "../../../assets/test.jpg";

const MiniPost = () => {
  return (
    <div className="w-[30%]">
      <img
        src={test}
        alt="test"
        className="rounded-xl w-full object-cover h-56"
      />

      <div className="p-3">
        <p className="text-slate-500 text-lg mb-0">Notice</p>
        <h1 className="font-extrabold text-base mb-0">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, non!
        </h1>
      </div>
    </div>
  );
};

export default MiniPost;
