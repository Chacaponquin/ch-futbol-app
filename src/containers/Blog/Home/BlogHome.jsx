import React, { useState } from "react";
import Header from "./components/Header";
import MiniPost from "./components/MiniPost";
import { useQuery } from "@apollo/client";
import { fetchBlogArticles } from "../../../graphql";
import SearchSection from "./components/SearchSection";
import Loader from "../../../shared/Loader/Loader";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../blog.css";
import { useNavigate } from "react-router";

const Blog = () => {
  const [blogArticles, setBlogArticles] = useState([]);
  const navigate = useNavigate();

  const { loading } = useQuery(fetchBlogArticles, {
    onCompleted: ({ fetchBlogArticles }) => setBlogArticles(fetchBlogArticles),
    onError: () => navigate("/"),
  });

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader className="w-[200px] h-[200px] esm:w-[150px] esm:h-[150px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col exsm:!px-3 esm:px-7 sm:px-16 md:px-24 lg:px-40">
      <Header headerArticles={blogArticles.slice(0, 5)} />
      <SearchSection />

      <div className="grid grid-cols-3 w-full gap-5 pb-5 esm:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {blogArticles.map((post, i) => (
          <MiniPost key={i} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
