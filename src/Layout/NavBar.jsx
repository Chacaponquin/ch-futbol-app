import { FaBars } from "react-icons/fa";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

const NavBar = ({ setSideBarOpen }) => {
  const location = useLocation();

  const navBarClass = clsx(
    "flex w-full py-6 px-20 justify-between items-center bg-white shadow-md mb-5",
    { "absolute top-0": location.pathname === "/" }
  );

  return (
    <div className={navBarClass}>
      <FaBars
        className="text-2xl text-black cursor-pointer"
        onClick={() => setSideBarOpen(true)}
      />
    </div>
  );
};

export default NavBar;
