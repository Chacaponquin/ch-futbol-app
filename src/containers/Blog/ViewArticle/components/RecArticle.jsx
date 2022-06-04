import React from "react";
import test from "../../../../assets/test.jpg";

const RecArticle = ({ articles = [] }) => {
  return (
    <div className="">
      <div className="grid grid-rows-3 gap-4 mt-10">
        {[1, 2, 3].map((art, i) => (
          <div className="flex exsm:flex-col" key={i}>
            <img
              src={test}
              alt=""
              className="object-cover w-[450px] h-[170px] rounded-md esm:h-[100px]"
            />

            <div className="flex flex-col space-y-2 py-4 px-10 justify-center text-sm esm:px-4">
              <h1 className="font-bold mb-0 text-xl esm:text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo,
                libero?
              </h1>
              <p className="text-gray-400">Lorem, ipsum dolor.</p>
              <p className="mb-0 esm:hidden sm:hidden xl:block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur officia deserunt vero accusamus repudiandae
                cupiditate minus voluptatem obcaecati laboriosam? Laborum.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecArticle;
