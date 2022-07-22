import { useState } from "react";
import { useMutation } from "@apollo/client";
import { createUserMutation } from "../../../../graphql/User/createUserMutation";
import { showError } from "../../../../helpers/showNotifications";
import { validateSignUp } from "../helpers/validateSignUp";
import { useNavigate } from "react-router";
import { userRoles } from "../../../../helpers/userRoles";
import { useContext } from "react";
import UserContext from "../../../../context/UserContext";

export const useSignUp = () => {
  const { signInUser } = useContext(UserContext);

  const [userInf, setUserInf] = useState({
    username: null,
    password: null,
    image: null,
    email: null,
    comfirmPassword: null,
  });

  const navigate = useNavigate();

  const [newUser, { loading }] = useMutation(createUserMutation);

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

          if (role === userRoles.PLAYER)
            signInUser(createUser, () =>
              navigate({ pathname: "/createPlayer" }, { replace: true })
            );
          else if (role === userRoles.TRAINER)
            signInUser(createUser, () =>
              navigate({ pathname: "/createTrainer" }, { replace: true })
            );
          else if (role === userRoles.CLUB_OWNER)
            signInUser(createUser, () =>
              navigate({ pathname: "/createTeam" }, { replace: true })
            );
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
