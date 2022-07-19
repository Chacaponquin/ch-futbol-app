import clsx from "clsx";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "supercons";
import UserContext from "../../context/UserContext";
import { navBarOptions } from "./helpers/navBarOptions";
import { NavLink } from "react-router-dom";

const NavBar = ({ setSideBarOpen }) => {
  const location = useLocation();

  const navBarClass = clsx("w-full pt-6 lg:px-20 esm:px-3 sm:px-8 md:px-12", {
    "absolute top-0": location.pathname === "/",
  });

  const { actualUser } = useContext(UserContext);

  return (
    <div className={navBarClass}>
      <div className="flex justify-between items-center bg-white shadow-xl mb-5 py-3 px-10">
        {actualUser ? (
          <div className="flex">
            <div className="text-xl text-black cursor-pointer">
              <Icon glyph="align-left" onClick={() => setSideBarOpen(true)} />
            </div>
          </div>
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

const NavBarAuthButtons = () => {
  return (
    <div className="flex items-center">
      <Link to={"/signUp"}>
        <button className="px-8 py-2 font-bold text-xl">SignUp</button>
      </Link>

      <Link to={"/login"}>
        <button className="font-bold bg-primary_color text-white rounded-md text-xl px-8 py-2">
          Login
        </button>
      </Link>
    </div>
  );
};

const UserInfSection = ({ username, image, isAdmin }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [userOptions, setUserOptions] = useState([]);

  const { setActualUser } = useContext(UserContext);

  useEffect(() => {
    if (isAdmin) setUserOptions(navBarOptions.MANAGER_OPTIONS);
    else setUserOptions(navBarOptions.CURRENT_USER_OPTIONS);
  }, [isAdmin]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setActualUser(null);
  };

  return (
    <div className="flex items-center">
      <div className="flex justify-end items-end">
        <img
          src={image}
          alt={username}
          className="w-[50px] h-[50px] object-cover cursor-pointer"
          onClick={() => setOpenOptions(!openOptions)}
        />

        {openOptions && (
          <div className="absolute translate-y-[105%] w-[250px] rounded-md shadow-lg bg-white px-4 py-3 flex flex-col gap-1 z-50">
            {userOptions.map((opt) => (
              <NavLink
                className="flex items-center px-5 gap-4 cursor-pointer py-2"
                to={opt.url}
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
