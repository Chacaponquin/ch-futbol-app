import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const Login = ({ setToken }) => {
  const [userInf, setUserInf] = useState({});

  const createUserMutation = gql`
    mutation ($user: UserInput!) {
      createUser(user: $user) {
        username
        image
        token
      }
    }
  `;

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

  const hanldeChange = (e) => {
    setUserInf({ ...userInf, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-full bg-slate-800 items-center justify-center h-screen">
      <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-8">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-96">
        <label htmlFor="" className="font-bold text-2xl text-white">
          Name
        </label>
        <input
          name="username"
          type="text"
          onChange={hanldeChange}
          placeholder="Name..."
          className="rounded-full my-3 px-7 py-3 outline-none font-semibold"
          required
        />

        <label htmlFor="" className="font-bold text-2xl text-white">
          Password
        </label>
        <input
          name="password"
          type="password"
          onChange={hanldeChange}
          placeholder="Password..."
          className="rounded-full my-3 px-7 py-3 outline-none font-semibold"
          required
        />

        <label htmlFor="" className="font-bold text-2xl text-white">
          Email
        </label>
        <input
          name="email"
          type="text"
          onChange={hanldeChange}
          placeholder="Email..."
          className="rounded-full my-3 px-7 py-3 outline-none font-semibold"
          required
        />

        <button className="rounded-xl mt-2 py-4 px-10 text-white font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-600 p-8">
          Create
        </button>
      </form>
    </div>
  );
};

export default Login;
