import React from "react";

const InitialForm = ({
  sectionClass,
  handleChangeSection,
  headerTextClass,
  handleSubmit,
  handleChange,
}) => {
  const inputClass = "rounded-full my-3 px-7 py-3 outline-none font-semibold";
  const labelClass = "font-bold text-2xl text-white";

  return (
    <div className={sectionClass}>
      <h1 className={headerTextClass}>Login</h1>

      <form
        onSubmit={(ev) => {
          //handleSubmit(ev);
          ev.preventDefault();
          handleChangeSection(1);
        }}
        className="flex flex-col w-96"
      >
        <label htmlFor="" className={labelClass}>
          Name
        </label>
        <input
          name="name"
          type="text"
          onChange={handleChange}
          placeholder="Name..."
          className={inputClass}
          required
        />

        <label htmlFor="" className={labelClass}>
          Password
        </label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password..."
          className={inputClass}
          required
        />

        <label htmlFor="" className={labelClass}>
          Email
        </label>
        <input
          name="email"
          type="text"
          onChange={handleChange}
          placeholder="Email..."
          className={inputClass}
          required
        />

        <button className="rounded-md mt-2 py-4 px-10 text-white transition-all duration-300 hover:shadow-md hover:shadow-white font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-600 p-8">
          Create
        </button>
      </form>
    </div>
  );
};

export default InitialForm;
