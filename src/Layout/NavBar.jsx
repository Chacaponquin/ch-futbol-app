import clsx from "clsx";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "supercons";
import UserContext from "../context/UserContext";

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
          <Link to={"/login"}>
            <button className="font-bold bg-primary_color text-white text-xl px-9 py-3 h-full">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

const UserInfSection = ({ username, image, isAdmin }) => {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className="flex items-center">
      <img
        src={image}
        alt={username}
        className="w-[50px] h-[50px] object-cover cursor-pointer"
      />

      {isAdmin && (
        <div className="text-xs border-2 border-solid border-[#f0932b] text-[#f0932b] rounded-full py-2 px-4 font-bold bg-[#f6e58d] ml-3">
          Admin
        </div>
      )}
    </div>
  );
};

export default NavBar;
