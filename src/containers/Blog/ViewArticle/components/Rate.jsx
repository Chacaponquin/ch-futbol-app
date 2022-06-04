import React from "react";
import angryFace from "../../../../assets/images/angry.png";
import smileFace from "../../../../assets/images/smiling.png";
import clsx from "clsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Rate = () => {
  return (
    <div className="flex items-center justify-between py-10 esm:py-5 esm:w-full esm:justify-center">
      <PostNextArticle status={"PREV"} />

      <div className="flex space-x-5 esm:flex-col esm:space-x-0 esm:space-y-3">
        <Image status={"SMILE"} />
        <Image status={"ANGRY"} />
      </div>

      <PostNextArticle status={"NEXT"} />
    </div>
  );
};

const PostNextArticle = ({ status }) => {
  const divClass = clsx(
    "flex-col cursor-pointer space-y-2 transition-all duration-300 hover:scale-110 esm:hidden sm:hidden xl:flex",
    { "items-end": status === "NEXT" },
    { "items-start": status === "PREV" }
  );

  return (
    <div className={divClass}>
      <p className="mb-0 font-bold text-base">Lorem ipsum dolor sit amet.</p>
      {status === "PREV" ? (
        <FaArrowLeft className="text-lg" />
      ) : (
        <FaArrowRight className="text-lg" />
      )}
    </div>
  );
};

const Image = ({ status }) => {
  const divClass = clsx(
    "flex items-center hover:text-white cursor-pointer duration-300 transition-all rounded-lg space-x-5 px-7 py-2 esm:w-full",
    { "hover:bg-primary_color": status === "SMILE" },
    { "hover:bg-danger_color": status === "ANGRY" }
  );

  return (
    <div className={divClass}>
      <img
        src={status === "SMILE" ? smileFace : angryFace}
        alt=""
        className="object-contain w-[70px] h-[70px] esm:w-[50px] esm:h-[50px]"
      />

      <p className="mb-0 font-bold">
        {status === "SMILE" ? "Gracias!!! Fue muy util" : "No me gusto"}
      </p>
    </div>
  );
};

export default Rate;
