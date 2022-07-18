import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router";

import {
  Home,
  BlogHome,
  SignUp,
  CreateTeam,
  CreatePlayer,
  AllPlayers,
  BlogViewArticle,
  Dashboard,
  Messages,
} from "../../containers/index";
import UserContext from "../../context/UserContext";
import Error404 from "../Error404";
import App from "./App";

const AppRoutes = () => {
  const { actualUser } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={actualUser ? <Navigate to="/dashboard" /> : <SignUp />}
      />

      <Route path="/" element={<App />}>
        <Route
          path="/"
          element={actualUser ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route path="/createTeam" element={<CreateTeam />} />
        <Route path="/createPlayer" element={<CreatePlayer />} />
        <Route path="/allPlayers" element={<AllPlayers />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/blog" element={<BlogHome />} />
        <Route path="/blog/viewArticle/:id" element={<BlogViewArticle />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
