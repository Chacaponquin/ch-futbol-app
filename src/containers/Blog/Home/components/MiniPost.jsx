import React from "react";
import { Link } from "react-router-dom";
import test from "../../../../assets/test.jpg";

const MiniPost = ({ title, _id, createdAt }) => {
  return (
    <Link to={`/blog/viewArticle/${_id}`}>
      <div className="shadow-lg rounded-lg h-full cursor-pointer">
        <img
          src={test}
          alt={title}
          className="object-cover h-[200px] w-full rounded-tl-lg rounded-tr-lg esm:h-[140px]"
        />

        <div className="flex flex-col px-7 py-4 justify-center text-base space-y-3 esm:text-sm">
          <h1 className="mb-0 font-bold  ">{title}</h1>

          <div className="flex justify-between items-center text-sm esm:text-xs sm:flex-col sm:space-y-2 md:flex-row md:space-y-0">
            <p className="mb-0 text-gray-400">{createdAt}</p>
            <div className="rounded-full bg-second_color text-white py-2 px-6">
              Buenas
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MiniPost;
