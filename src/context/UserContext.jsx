import { useQuery } from "@apollo/client";
import React, { createContext, useState } from "react";
import { getUserByToken } from "../graphql/User/getUserByToken";

const UserContext = createContext({
  actualUser: null,
  signInUser: () => {},
  getUserLoading: true,
  elementActive: null,
});

const UserProvider = ({ children }) => {
  const [actualUser, setActualUser] = useState(null);

  const [elementActive, setElementActive] = useState(null);

  const signInUser = (user, callback) => {
    setActualUser(user);

    callback();
  };

  const { loading: getUserLoading } = useQuery(getUserByToken, {
    onCompleted: ({ getUserByToken }) => {
      if (getUserByToken.elementsOwner.length > 0) {
        setElementActive(getUserByToken.elementsOwner[0]);
      }

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
    <UserContext.Provider
      value={{ actualUser, signInUser, getUserLoading, elementActive }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
