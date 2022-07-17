import React from "react";
import { BsX } from "react-icons/bs";
import Icon from "supercons";
import clsx from "clsx";
import UserContext from "../context/UserContext";
import { useEffect, useState, useContext } from "react";
import { userRoles } from "../helpers/userRoles";
import { navBarOptionsObject } from "../helpers/navBarOptions";
import { NavLink } from "react-router-dom";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const [navBarOptions, setNavBarOptions] = useState([]);

  const sideBarClass = clsx(
    "fixed w-[250px] h-screen bg-slate-100 top-0 flex flex-col p-4 transition-all duration-500 z-20",
    { "translate-x-0": sideBarOpen },
    { "-translate-x-[100%]": !sideBarOpen }
  );

  const optionClass =
    "flex w-full text-lg items-center font-bold py-3 rounded-md px-4 ";

  const { actualUser } = useContext(UserContext);

  useEffect(() => {
    if (actualUser) {
      switch (actualUser.role) {
        case userRoles.PLAYER:
          setNavBarOptions(navBarOptionsObject.PLAYER_OPTIONS);
          break;
        case userRoles.TRAINER:
          setNavBarOptions(navBarOptionsObject.TRAINER_OPTIONS);
          break;
        case userRoles.CLUB_OWNER:
          setNavBarOptions(navBarOptionsObject.OWNER_OPTIONS);
          break;
        default:
          break;
      }
    }
  }, [actualUser]);

  return (
    <div className={sideBarClass}>
      <div className="w-full flex justify-end">
        <BsX
          onClick={() => setSideBarOpen(false)}
          className="cursor-pointer text-3xl"
        />
      </div>

      <div className="flex flex-col px-3 mt-5 space-y-1">
        {navBarOptions.map((opt, i) => (
          <NavLink
            to={opt.url}
            className={({ isActive }) =>
              !isActive
                ? optionClass
                : optionClass + " bg-primary_color text-white"
            }
            key={i}
          >
            <Icon glyph={opt.icon} />
            <p className="ml-5 mb-0">{opt.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
