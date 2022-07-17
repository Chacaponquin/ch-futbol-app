import { useState } from "react";
import AvatarPicker from "./components/AvatarPicker";
import InitialForm from "./components/InitialForm";
import { useSignUp } from "./hooks/useSignUp";
import RolePicker from "./components/RolePicker";

const SignUp = ({ setToken }) => {
  const [sectionActive, setSectionActive] = useState(0);

  const { userInf, handleChange, handleChangeUserImage, handleSubmit } =
    useSignUp();

  const headerTextClass =
    "font-monserratBold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-3 m-0 text-center esm:text-6xl";

  const changeToNextSection = () => setSectionActive(sectionActive + 1);

  const changeToPrevSection = () => setSectionActive(sectionActive - 1);

  return (
    <div className="w-full h-screen bg-slate-800 overflow-x-hidden ">
      <div className="flex w-[300vw] items-center h-full">
        <SignUpSection sectionActive={sectionActive}>
          <InitialForm
            changeToNextSection={changeToNextSection}
            headerTextClass={headerTextClass}
            handleChange={handleChange}
          />
        </SignUpSection>

        <SignUpSection sectionActive={sectionActive}>
          <AvatarPicker
            changeToNextSection={changeToNextSection}
            changeToPrevSection={changeToPrevSection}
            headerTextClass={headerTextClass}
            handleChangeUserImage={handleChangeUserImage}
            imageSelected={userInf.image}
          />
        </SignUpSection>

        <SignUpSection sectionActive={sectionActive}>
          <RolePicker
            changeToPrevSection={changeToPrevSection}
            headerTextClass={headerTextClass}
            handleSubmit={handleSubmit}
          />
        </SignUpSection>
      </div>
    </div>
  );
};

const SignUpSection = ({ children, sectionActive }) => {
  return (
    <div
      className="w-[100vw] flex flex-col items-center transition-all duration-500 -translate-x-[200vw]"
      style={{ transform: `translateX(-${sectionActive * 100}vw)` }}
    >
      {children}
    </div>
  );
};

export default SignUp;
