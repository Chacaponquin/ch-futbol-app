import { useQuery } from "@apollo/client";
import React, { createContext, useState } from "react";
import { getUserByToken } from "../graphql/User/signInUser";
import { dataMap } from "../helpers/dataMap";

const UserContext = createContext({
  actualUser: null,
  signInUser: () => {},
  handleSignOut: () => {},
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
      const { elementsOwner, ...rest } = getUserByToken;
      const elements = elementsOwner.map((el) => dataMap(el));

      if (getUserByToken.elementsOwner.length > 0) {
        setElementActive(elements[0]);
      }

      setActualUser({ ...rest, elementsOwner: elements });
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

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setActualUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        actualUser,
        signInUser,
        getUserLoading,
        elementActive,
        handleSignOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
