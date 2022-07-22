import { useLazyQuery } from "@apollo/client";
import React, { useState, useContext } from "react";
import { loginUser } from "../../../graphql/User/loginUser";
import { showError } from "../../../helpers/showNotifications";
import Loader from "../../../shared/Loader/Loader";
import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { signInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  });

  const [loginUserQuery, { loading }] = useLazyQuery(loginUser);

  const inputClass = "rounded-md mt-2 px-7 py-3 font-semibold w-full esm:px-4";
  const labelClass = "font-bold text-xl text-white block esm:text-lg";

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUserQuery({
      variables: { user: loginData },
      onCompleted: ({ loginUser }) => {
        localStorage.setItem("token", loginUser.token);

        signInUser(loginUser, () =>
          navigate({ pathname: "/blog" }, { replace: true })
        );
      },
      onError: showError,
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-800">
      <div className="w-96 flex flex-col esm:w-80">
        <h1 className="font-monserratBold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-3 m-0 text-center esm:text-6xl">
          Login
        </h1>

        <form action="" onSubmit={handleSubmit} className={"space-y-5"}>
          <div>
            <label htmlFor="" className={labelClass}>
              Email:
            </label>
            <input
              name="email"
              type="text"
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="" className={labelClass}>
              Password:
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password..."
              className={inputClass}
              required
            />
          </div>

          <div className="flex w-full justify-center">
            {loading ? (
              <Loader className="w-[100px]" />
            ) : (
              <button className="rounded-md w-full mt-2 py-4 px-10 text-white transition-all duration-300 hover:shadow-sm hover:shadow-white font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-600 p-8 esm:text-lg esm:py-3">
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
