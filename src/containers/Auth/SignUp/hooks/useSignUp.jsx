import { useState } from "react";
import { useMutation } from "@apollo/client";
import { createUserMutation } from "../../../../graphql/User/signInUser";
import { showError } from "../../../../helpers/showNotifications";
import { validateSignUp } from "../helpers/validateSignUp";
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

          signInUser(createUser, () => {
            window.location.reload();
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
