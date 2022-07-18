import { useQuery } from "@apollo/client";
import React, { createContext, useState } from "react";
import { getUserByToken } from "../graphql/User/getUserByToken";

const UserContext = createContext({ actualUser: null, setActualUser: null });

const UserProvider = ({ children }) => {
  const [actualUser, setActualUser] = useState(null);

  const token = localStorage.getItem("token");

  const { loading: getUserLoading } = useQuery(getUserByToken, {
    variables: {
      token: token ? token : null,
    },
    onCompleted: ({ getUserByToken }) => {
      setActualUser(getUserByToken);
    },
    onError: (error) => {
      setActualUser(null);
    },
  });

  return (
    <UserContext.Provider value={{ actualUser, setActualUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
