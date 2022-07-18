import { useContext, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { createUserMutation } from "../../../../graphql/User/createUserMutation";
import { showError } from "../../../../helpers/showNotifications";
import { validateSignUp } from "../helpers/validateSignUp";
import UserContext from "../../../../context/UserContext";
import { getUserByToken } from "../../../../graphql/User/getUserByToken";
import { useNavigate } from "react-router";
import { userRoles } from "../../../../helpers/userRoles";

export const useSignUp = () => {
  const [userInf, setUserInf] = useState({
    username: null,
    password: null,
    image: null,
    email: null,
    comfirmPassword: null,
  });

  const navigate = useNavigate();

  const { setActualUser } = useContext(UserContext);

  const [newUser, { loading }] = useMutation(createUserMutation);

  const [updateContext] = useLazyQuery(getUserByToken);

  const handleSubmit = (role) => {
    try {
      validateSignUp(userInf);

      newUser({
        variables: {
          user: {
            username: userInf.username,
            image: userInf.image,
            email: userInf.email,
            password: userInf.password,
            role,
          },
        },
        onCompleted: ({ createUser }) => {
          localStorage.setItem("token", createUser.token);

          updateContext({
            variables: {
              token: createUser.token,
            },
            onCompleted: ({ getUserByToken }) => {
              setActualUser(getUserByToken);

              switch (role) {
                case userRoles.PLAYER:
                  navigate("/createPlayer", { replace: true });
                  break;
                case userRoles.TRAINER:
                  navigate("/");
                  break;
                case userRoles.CLUB_OWNER:
                  navigate("/createTeam");
                  break;
                default:
                  break;
              }
            },
            onError: showError,
          });
        },
        onError: showError,
      });
    } catch (error) {
      showError(error);
    }
  };

  const handleChange = (e) => {
    setUserInf({ ...userInf, [e.target.name]: e.target.value });
  };

  const handleChangeUserImage = (url) => setUserInf({ ...userInf, image: url });

  return {
    userInf,
    loading,
    handleSubmit,
    handleChange,
    handleChangeUserImage,
  };
};
