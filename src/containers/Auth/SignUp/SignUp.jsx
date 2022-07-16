import { useState } from "react";
import AvatarPicker from "./components/AvatarPicker";
import InitialForm from "./components/InitialForm";
import { useSignUp } from "./hooks/useSignUp";
import clsx from "clsx";

const SignUp = ({ setToken }) => {
  const [sectionActive, setSectionActive] = useState(0);

  const { userInf, handleChange, handleSubmit, handleChangeUserImage } =
    useSignUp();

  const roles = {
    PLAYER: "Player",
    TRAINER: "Trainer",
    CLUB_OWNER: "Club Owner",
  };

  const porcent = sectionActive * 100;

  const sectionClass = clsx(
    "w-[100vw] flex flex-col items-center transition-all duration-500",
    `-translate-x-[${porcent}vw]`
  );

  const handleChangeSection = (section) => setSectionActive(section);

  const headerTextClass =
    "font-monserratBold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-3 m-0 text-center";

  return (
    <div className="w-full h-screen bg-slate-800 overflow-x-hidden ">
      <div className="flex w-[300vw] items-center h-full">
        <InitialForm
          sectionClass={sectionClass}
          handleChangeSection={handleChangeSection}
          headerTextClass={headerTextClass}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <AvatarPicker
          sectionClass={sectionClass}
          handleChangeSection={handleChangeSection}
          headerTextClass={headerTextClass}
          handleChangeUserImage={handleChangeUserImage}
          imageSelected={userInf.image}
        />
      </div>
    </div>
  );
};

export default SignUp;
