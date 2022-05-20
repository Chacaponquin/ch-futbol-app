import { FaBars } from "react-icons/fa";

const NavBar = ({ setSideBarOpen }) => {
  return (
    <div className="flex w-full py-6 px-20 justify-between items-center bg-primary_color mb-5">
      <FaBars
        className="text-2xl text-white cursor-pointer"
        onClick={() => setSideBarOpen(true)}
      />
    </div>
  );
};

export default NavBar;
