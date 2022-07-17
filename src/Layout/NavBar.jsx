import { FaBars } from "react-icons/fa";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = ({ setSideBarOpen }) => {
  const location = useLocation();

  const navBarClass = clsx("w-full pt-6 lg:px-20 esm:px-5 sm:px-8 md:px-12", {
    "absolute top-0": location.pathname === "/",
  });

  return (
    <div className={navBarClass}>
      <div className="flex justify-between items-center bg-white shadow-lg mb-5 rounded-md">
        <div className="py-3 px-20 flex">
          <FaBars
            className="text-xl text-black cursor-pointer"
            onClick={() => setSideBarOpen(true)}
          />
        </div>

        <Link to={"/login"}>
          <button className="font-bold bg-primary_color text-white text-xl px-9 py-3 h-full rounded-tr-md rounded-br-md">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
