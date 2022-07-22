import React, { useContext } from "react";
import { Navigate } from "react-router";
import UserContext from "../../../context/UserContext";

const UserRoute = ({ children }) => {
  const { actualUser } = useContext(UserContext);

  if (actualUser) return children;

  return <Navigate to={"/login"} replace={true} />;
};

export default UserRoute;
