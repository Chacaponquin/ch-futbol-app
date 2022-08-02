import React from "react";
import Icon from "supercons";
import image from "../../../../assets/images/welcome-message.png";

const WelcomeMessage = () => {
  return (
    <div className="w-full absolute top-0 left-0 h-screen bg-black/50 flex justify-center items-center">
      <div className="bg-white max-w-4xl rounded-md py-14 px-32 flex flex-col gap-2">
        <div className="flex w-full justify-center">
          <img
            src={image}
            alt="welcome-message"
            className="object-contain w-[350px]"
          />
        </div>

        <div className="flex items-center gap-2 w-full justify-center">
          <h1 className="font-monserratBold uppercase text-4xl text-center mb-0">
            Bienvenido!!!
          </h1>

          <Icon glyph="welcome" size={60} />
        </div>

        <div>
          <p className="mb-0 font-bold text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            excepturi magnam maiores earum sit quibusdam aliquid omnis ducimus
            laudantium!
          </p>
        </div>

        <div className="flex w-full justify-end">
          <button className="py-2 px-7 rounded-md bg-primary_color text-white font-bold text-xl mt-3">
            Create Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
