import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import WelcomeMessage from "./components/WelcomeMessage/WelcomeMessage";

const Dashboard = () => {
  const { actualUser } = useContext(UserContext);

  if (actualUser.elementsOwner.length === 0 && actualUser.isNewUser)
    return <WelcomeMessage />;

  return <div>Dashboard</div>;
};

export default Dashboard;
