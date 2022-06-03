import React from "react";
import test from "../../../assets/test.jpg";

const BlogViewArticle = () => {
  return (
    <div className="w-full flex flex-col px-52">
      <div className="w-full">
        <img src={test} alt="" className="w-full h-[300px] object-cover" />
        <h1 className="font-monserratBold text-3xl py-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
          mollitia odit voluptatibus.
        </h1>
      </div>
    </div>
  );
};

export default BlogViewArticle;
