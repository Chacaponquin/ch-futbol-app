import React from "react";
import { BsX } from "react-icons/bs";
import Icon from "supercons";
import clsx from "clsx";
import UserContext from "../../context/UserContext";
import { useEffect, useState, useContext } from "react";
import { userRoles } from "../../helpers/userRoles";
import { sideBarOptionsObject } from "./helpers/sideBarOptions";
import { NavLink } from "react-router-dom";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const { actualUser, elementActive } = useContext(UserContext);
  const [navBarOptions, setNavBarOptions] = useState([]);

  const sideBarClass = clsx(
    "fixed w-[300px] h-screen bg-slate-50 top-0 flex flex-col p-4 transition-all duration-500 z-20",
    { "translate-x-0": sideBarOpen },
    { "-translate-x-[100%]": !sideBarOpen }
  );

  const optionClass =
    "flex w-full text-lg items-center font-bold py-3 rounded-md px-4";

  const elementsClass = (id) =>
    clsx("flex items-center gap-3 py-2 px-3 rounded-md", {
      "bg-primary_color text-white font-bold": id === elementActive.id,
    });

  useEffect(() => {
    if (actualUser) {
      switch (actualUser.role) {
        case userRoles.PLAYER:
          setNavBarOptions(sideBarOptionsObject.PLAYER_OPTIONS);
          break;
        case userRoles.TRAINER:
          setNavBarOptions(sideBarOptionsObject.TRAINER_OPTIONS);
          break;
        case userRoles.CLUB_OWNER:
          setNavBarOptions(sideBarOptionsObject.OWNER_OPTIONS);
          break;
        case userRoles.MANAGER:
          setNavBarOptions(sideBarOptionsObject.MANAGER_OPTIONS);
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

      <div className="flex flex-col px-3 mt-5 gap-1">
        <div>
          {actualUser &&
            !actualUser.isAdmin &&
            actualUser.elementsOwner.length &&
            actualUser.elementsOwner.map((el, i) => (
              <ElementCard element={el} key={i} className={elementsClass} />
            ))}
        </div>

        {navBarOptions.map((opt, i) => (
          <NavLink
            to={opt.url}
            className={({ isActive }) =>
              !isActive
                ? optionClass
                : optionClass + " bg-primary_color !text-white"
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

const ElementCard = ({ element, className }) => {
  return (
    <div className={className(element.id)}>
      <img
        src={element.image}
        alt={element.name}
        className={"w-[40px] h-[40px] object-cover rounded-full"}
      />

      <p className="mb-0 text-sm">{element.name}</p>
    </div>
  );
};

export default SideBar;
