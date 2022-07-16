import React from "react";
import { BsX } from "react-icons/bs";
import { FaUser, FaBars } from "react-icons/fa";
import clsx from "clsx";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const sideBarClass = clsx(
    "fixed w-[250px] h-screen bg-slate-100 top-0 flex flex-col p-4 transition-all duration-500 z-20",
    { "translate-x-0": sideBarOpen },
    { "-translate-x-[100%]": !sideBarOpen }
  );

  return (
    <div className={sideBarClass}>
      <div className="w-full flex justify-end">
        <BsX
          onClick={() => setSideBarOpen(false)}
          className="cursor-pointer text-3xl"
        />
      </div>

      <div className="flex flex-col px-3 mt-5 space-y-1">
        <div className="flex w-full text-lg items-center font-bold py-3 rounded-md px-4 bg-primary_color text-white">
          <FaUser />
          <p className="ml-5 mb-0">My Player</p>
        </div>

        <div className="flex w-full text-lg items-center font-bold py-3 rounded-md px-4">
          <FaBars />
          <p className="ml-5 mb-0">Ofertas</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
