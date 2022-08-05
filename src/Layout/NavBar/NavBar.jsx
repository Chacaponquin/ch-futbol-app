import clsx from "clsx";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "supercons";
import UserContext from "../../context/UserContext";
import { navBarOptions } from "./helpers/navBarOptions";
import { NavLink } from "react-router-dom";
import { welcomeOptions } from "./helpers/welcomeOptions";

const NavBar = ({ setSideBarOpen }) => {
  const location = useLocation();

  const navBarClass = clsx("w-full pt-6 lg:px-20 esm:px-3 sm:px-8 md:px-12", {
    "absolute top-0": location.pathname === "/",
  });

  const { actualUser } = useContext(UserContext);

  return (
    <div className={navBarClass}>
      <div className="grid grid-cols-3 justify-between items-center bg-white shadow-xl mb-5 py-3 px-10">
        {actualUser ? (
          <div className="flex">
            <div className="text-xl text-black cursor-pointer">
              {actualUser &&
                (actualUser.elementsOwner.length || actualUser.isAdmin) && (
                  <Icon
                    glyph="align-left"
                    onClick={() => setSideBarOpen(true)}
                  />
                )}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {location.pathname === "/" ||
        location.pathname === "/api" ||
        location.pathname === "/aboutUs" ? (
          <WelcomeOptions />
        ) : (
          <div></div>
        )}

        {actualUser ? (
          <UserInfSection {...actualUser} />
        ) : (
          <NavBarAuthButtons />
        )}
      </div>
    </div>
  );
};

const WelcomeOptions = () => {
  const navBarLinkActive = ({ isActive }) => {
    return clsx(
      "flex items-center gap-2 py-2 rounded-lg px-4 font-bold rounded-full ",
      {
        "bg-primary_color !text-white": isActive,
      }
    );
  };

  return (
    <div className="flex gap-3 items-center">
      {welcomeOptions.map((opt, i) => (
        <NavLink to={opt.url} className={navBarLinkActive} key={i}>
          <Icon glyph={opt.icon} />
          <p className="mb-0 font-bold lg:block hidden">{opt.label}</p>
        </NavLink>
      ))}
    </div>
  );
};

const NavBarAuthButtons = () => {
  return (
    <div className="flex items-center justify-end">
      <Link to={"/login"}>
        <button className="font-bold bg-primary_color text-white rounded-md text-base px-7 py-2">
          Get Access
        </button>
      </Link>
    </div>
  );
};

const UserInfSection = ({ username, image, isAdmin }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [userOptions, setUserOptions] = useState([]);

  const { handleSignOut } = useContext(UserContext);

  useEffect(() => {
    if (isAdmin) setUserOptions(navBarOptions.MANAGER_OPTIONS);
    else setUserOptions(navBarOptions.CURRENT_USER_OPTIONS);
  }, [isAdmin]);

  return (
    <div className="flex items-center justify-end">
      <div className="flex justify-end items-end">
        <img
          src={image}
          alt={username}
          className="w-[50px] h-[50px] object-cover cursor-pointer"
          onClick={() => setOpenOptions(!openOptions)}
        />

        {openOptions && (
          <div className="absolute translate-y-[105%] w-[250px] rounded-md shadow-lg bg-white px-4 py-3 flex flex-col gap-1 z-50">
            {userOptions.map((opt, i) => (
              <NavLink
                className="flex items-center px-5 gap-4 cursor-pointer py-2"
                to={opt.url}
                key={i}
              >
                <Icon glyph={opt.icon} />
                <p className="mb-0 font-bold">{opt.label}</p>
              </NavLink>
            ))}

            <div
              className="flex items-center px-5 gap-4 cursor-pointer py-2"
              onClick={handleSignOut}
            >
              <Icon glyph="door-leave" />
              <p className="mb-0 font-bold">Sign Out</p>
            </div>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="text-xs border-2 border-solid border-[#f0932b] text-[#f0932b] rounded-full py-2 px-4 font-bold bg-[#f6e58d] ml-3">
          Admin
        </div>
      )}
    </div>
  );
};

export default NavBar;
