import { useState } from "react";
import { Outlet } from "react-router";
import NavBar from "./Layout/NavBar";
import SideBar from "./Layout/SideBar";

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <NavBar setSideBarOpen={setSideBarOpen} />
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <Outlet />
    </>
  );
}

export default App;
