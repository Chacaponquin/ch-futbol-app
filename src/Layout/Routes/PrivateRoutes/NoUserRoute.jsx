import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router";
import UserContext from "../../../context/UserContext";

const NoUserRoute = ({ children }) => {
  const { actualUser } = useContext(UserContext);

  if (actualUser) return <Navigate to={"/dashboard"} replace={true} />;

  return children;
};

export default NoUserRoute;
