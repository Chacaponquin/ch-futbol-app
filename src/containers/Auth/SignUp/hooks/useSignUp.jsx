import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { createUserMutation } from "../../../../graphql/User/createUserMutation";
import { showError } from "../../../../helpers/showNotifications";
import { validateSignUp } from "../../../../helpers/validateSignUp";
import UserContext from "../../../../context/UserContext";

export const useSignUp = () => {
  const [userInf, setUserInf] = useState({
    username: null,
    password: null,
    image: null,
    email: null,
    comfirmPassword: null,
  });

  const hola = useContext(UserContext);

  const [newUser, { loading }] = useMutation(createUserMutation);

  const handleSubmit = () => {
    try {
      validateSignUp(userInf);

      newUser({
        variables: {
          user: {
            username: userInf.username,
            image: userInf.image,
            email: userInf.email,
            password: userInf.password,
          },
        },
        onCompleted: ({ createUser }) => {
          console.log(createUser.token);
          localStorage.setItem("token", createUser.token);
          console.log(hola);
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
