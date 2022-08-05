import React, { useContext } from "react";
import { Route, Routes } from "react-router";

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
  Login,
  CreateTrainer,
  CreateLeague,
  Offerts,
  Api,
  AboutUs,
  MyProfile,
} from "../../containers/index";

import { TYPES_MESSAGE_QUERY } from "../../containers/Messages/Messages/helpers/typeMessageQuery";
import UserContext from "../../context/UserContext";
import Loader from "../../shared/Loader/Loader";
import { Error404 } from "../index";
import App from "./App";
import AdminRoute from "./PrivateRoutes/AdminRoute";
import NoUserRoute from "./PrivateRoutes/NoUserRoute";
import UserRoute from "./PrivateRoutes/UserRoute";

const AppRoutes = () => {
  const { getUserLoading } = useContext(UserContext);

  if (getUserLoading) {
    return (
      <div className="flex w-full h-screen bg-white items-center justify-center">
        <Loader className="w-[250px] esm:w-[150px]" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/signUp" element={<NoUserRoute children={<SignUp />} />} />
      <Route path="/login" element={<NoUserRoute children={<Login />} />} />
      <Route path="*" element={<Error404 />} />

      <Route path="/" element={<App />}>
        <Route path="/" element={<NoUserRoute children={<Home />} />} />
        <Route path="/api" element={<Api />} />
        <Route path="/aboutUs" element={<AboutUs />} />

        <Route path="/myProfile" element={<MyProfile />} />

        <Route path="/offerts" element={<UserRoute children={<Offerts />} />} />

        <Route
          path="/createTeam"
          element={<UserRoute children={<CreateTeam />} />}
        />
        <Route
          path="/createPlayer"
          element={<UserRoute children={<CreatePlayer />} />}
        />
        <Route
          path="/createTrainer"
          element={<UserRoute children={<CreateTrainer />} />}
        />
        <Route
          path="/createLeague"
          element={<AdminRoute children={<CreateLeague />} />}
        />

        <Route
          path="/userMessages"
          element={
            <UserRoute
              children={<Messages typeQuery={TYPES_MESSAGE_QUERY.USER} />}
            />
          }
        />

        <Route
          path="/allPlayers"
          element={<AdminRoute children={<AllPlayers />} />}
        />

        <Route
          path="/messages"
          element={
            <UserRoute
              children={<Messages typeQuery={TYPES_MESSAGE_QUERY.ELEMENT} />}
            />
          }
        />

        <Route
          path="/dashboard"
          element={<UserRoute children={<Dashboard />} />}
        />

        <Route path="/blog" element={<BlogHome />} />
        <Route path="/blog/viewArticle/:id" element={<BlogViewArticle />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
