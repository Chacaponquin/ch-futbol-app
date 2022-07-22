import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router";
import UserContext from "../../../context/UserContext";

const AdminRoute = ({ children }) => {
  const { actualUser } = useContext(UserContext);

  if (actualUser && actualUser.isAdmin) return children;

  return <Navigate to={"/login"} replace={true} />;
};

export default AdminRoute;
