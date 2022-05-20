import React from "react";
import Header from "./components/Header";
import MiniPost from "./components/MiniPost";

const Blog = () => {
  return (
    <div className="flex flex-col px-40">
      <Header />

      <div className="flex w-full flex-wrap justify-between py-10">
        {[1, 2, 3].map((el) => (
          <MiniPost />
        ))}
      </div>
    </div>
  );
};

export default Blog;
