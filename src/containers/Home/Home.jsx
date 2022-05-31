import React from "react";

const Home = () => {
  return (
    <div className="flex w-full justify-center items-center h-screen">
      <div className="flex flex-col items-center max-w-4xl">
        <div className="text-center">
          <h1 className="font-monserratBold text-9xl text-primary_color mb-4">
            Welcome to
          </h1>
          <h1 className="font-monserratBold text-9xl text-primary_color mb-7">
            My Api
          </h1>
        </div>

        <p className="text-lg text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptatem
          dolor totam vel cupiditate, nulla voluptatum facere modi eum
          veritatis, optio similique, sapiente iusto!
        </p>
        <div className="flex items-center space-x-10 py-6 justify-center">
          <button className="font-bold bg-white text-primary_color py-4 px-12 text-2xl rounded-sm border-2 border-primary_color duration-300 transition-all hover:shadow-lg">
            Free Access
          </button>
          <button className="font-bold bg-primary_color text-white py-4 px-12 text-2xl rounded-sm duration-300 transition-all hover:shadow-lg">
            Hire Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
