import { useQuery } from "@apollo/client";
import React, { createContext, useState } from "react";
import { getUserByToken } from "../graphql/User/getUserByToken";

const UserContext = createContext({
  actualUser: null,
  setActualUser: null,
  getUserLoading: true,
});

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
      const err = error?.graphQLErrors[0]?.extensions?.exception;

      if (err) {
        if (err.statusCode === 404) {
          localStorage.removeItem("token");
        }
      }

      setActualUser(null);
    },
  });

  return (
    <UserContext.Provider value={{ actualUser, setActualUser, getUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
