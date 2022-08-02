import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import Icon from "supercons";
import image from "../../../../assets/images/welcome-message.png";
import { userRoles } from "../../../../helpers/userRoles";
import UserContext from "../../../../context/UserContext";

const WelcomeMessage = () => {
  const navigate = useNavigate();
  const { actualUser } = useContext(UserContext);

  const handleRedirect = () => {
    let redirectTo = "";

    if (actualUser.role === userRoles.PLAYER) redirectTo = "/createPlayer";
    else if (actualUser.role === userRoles.TRAINER)
      redirectTo = "/createTrainer";
    else if (actualUser.role === userRoles.CLUB_OWNER)
      redirectTo = "/createTeam";

    return navigate(redirectTo);
  };

  return (
    <div className="w-full absolute top-0 left-0 h-screen bg-black/50 flex justify-center items-center px-20 esm:px-10">
      <div className="bg-white lg:max-w-4xl sm:w-full rounded-md py-10 px-32 flex flex-col gap-2 esm:px-10">
        <div className="flex w-full justify-center">
          <img
            src={image}
            alt="welcome-message"
            className="object-contain lg:w-[350px] w-[280px]"
          />
        </div>

        <div className="flex items-center gap-2 w-full justify-center">
          <h1 className="font-monserratBold uppercase text-4xl text-center mb-0 esm:text-3xl">
            Bienvenido!!!
          </h1>

          <div className="text-warning">
            {" "}
            <Icon glyph="welcome" size={60} />
          </div>
        </div>

        <div>
          <p className="mb-0 font-bold text-base esm:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            excepturi magnam maiores earum sit quibusdam aliquid omnis ducimus
            laudantium!
          </p>
        </div>

        <div className="flex w-full justify-end">
          <button
            className="py-2 px-7 rounded-md bg-primary_color text-white font-bold text-xl mt-3 esm:text-lg"
            onClick={handleRedirect}
          >
            Create {actualUser.role}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
