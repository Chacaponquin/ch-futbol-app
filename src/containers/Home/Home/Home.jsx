import React from "react";

const Home = () => {
  return (
    <div className="flex w-full flex-col px-20">
      <div className="relative top-[200px]">
        <div className="max-w-[500px]">
          <div className="flex flex-col items-start text-7xl ">
            <h1 className="mb-0 font-monserratBold">Welcome to</h1>
            <h1 className="mb-0 font-monserratBold">My Api</h1>
          </div>

          <p className="mb-0 text-gray-500 font-bold text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            quas veniam quos enim nostrum earum, rerum deleniti? Aut, ducimus
            voluptas!
          </p>

          <div className="flex items-center gap-7 text-2xl">
            <button className="py-2 px-7 bg-primary_color font-bold text-white">
              Dowload
            </button>

            <button>Use Api</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
