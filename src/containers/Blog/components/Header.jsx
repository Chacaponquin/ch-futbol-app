import React from "react";
import test from "../../../assets/test.jpg";

const Header = () => {
  return (
    <div className="w-full flex justify-between h-max">
      <div className="w-[60%] rounded-xl shadow-slate-400 shadow-lg">
        <img src={test} alt="test" className="w-full object-cover h-64" />

        <div className="px-10 py-6">
          <p className="text-slate-500 text-lg mb-0">Notice</p>
          <h1 className="font-extrabold text-lg mb-0">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore,
            non!
          </h1>
        </div>
      </div>

      <div className="flex flex-col overflow-auto bg-black w-[35%]">
        <div className="p-5 bg-slate-50">
          <h1 className="text-primary_color text-lg">Notice</h1>
          <p className="text-base mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
            facere!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
