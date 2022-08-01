import { useContext, useState } from "react";
import { Outlet } from "react-router";
import UserContext from "../../context/UserContext";
import { SideBar, NavBar } from "../index";

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { actualUser } = useContext(UserContext);

  return (
    <>
      <NavBar setSideBarOpen={setSideBarOpen} />
      {actualUser &&
        (actualUser.elementsOwner.length || actualUser.isAdmin) && (
          <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
        )}
      <Outlet />
    </>
  );
}

export default App;
