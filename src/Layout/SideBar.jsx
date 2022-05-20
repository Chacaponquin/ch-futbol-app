import React from "react";
import { BsX } from "react-icons/bs";
import clsx from "clsx";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const sideBarClass = clsx(
    "fixed w-[250px] h-screen bg-slate-200 top-0 flex flex-col p-4 transition-all duration-500",
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
    </div>
  );
};

export default SideBar;
