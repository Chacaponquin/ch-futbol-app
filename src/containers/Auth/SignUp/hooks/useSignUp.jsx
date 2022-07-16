import { useState } from "react";
import { useMutation } from "@apollo/client";
import { createUserMutation } from "../../../../graphql/User/createUserMutation";

export const useSignUp = () => {
  const [userInf, setUserInf] = useState({
    name: null,
    password: null,
    image: null,
    email: null,
  });

  const [newUser] = useMutation(createUserMutation);

  const handleSubmit = (e) => {
    e.preventDefault();

    newUser({ variables: { user: userInf } })
      .then(({ data }) => {
        /*localStorage.setItem("token", data.login);
        setToken(data.login);*/
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setUserInf({ ...userInf, [e.target.name]: e.target.value });
  };

  const handleChangeUserImage = (url) => setUserInf({ ...userInf, image: url });

  return {
    userInf,
    handleSubmit,
    handleChange,
    handleChangeUserImage,
  };
};
