import React from "react";

const InitialForm = ({
  changeToNextSection,
  headerTextClass,
  handleChange,
}) => {
  const inputClass = "rounded-md mt-2 px-7 py-3 font-semibold w-full";
  const labelClass = "font-bold text-xl text-white block";

  return (
    <div>
      <h1 className={headerTextClass}>Login</h1>

      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          changeToNextSection();
        }}
        className="flex flex-col w-96 space-y-5"
      >
        <div>
          <label htmlFor="" className={labelClass}>
            Name:
          </label>
          <input
            name="username"
            type="text"
            onChange={handleChange}
            placeholder="Name..."
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="" className={labelClass}>
            Email:
          </label>
          <input
            name="email"
            type="text"
            onChange={handleChange}
            placeholder="Email..."
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

        <div>
          <label htmlFor="" className={labelClass}>
            Confirm Password:
          </label>
          <input
            name="comfirmPassword"
            type="password"
            onChange={handleChange}
            placeholder="Comfirm Password..."
            className={inputClass}
            required
          />
        </div>

        <button className="rounded-md mt-2 py-4 px-10 text-white transition-all duration-300 hover:shadow-sm hover:shadow-white font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-600 p-8">
          Create
        </button>
      </form>
    </div>
  );
};

export default InitialForm;
