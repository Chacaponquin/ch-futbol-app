import React, { useState } from "react";
import Header from "./components/Header";
import MiniPost from "./components/MiniPost";
import { useQuery } from "@apollo/client";
import { fetchBlogArticles } from "../../../graphql";
import SearchSection from "./components/SearchSection";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../blog.css";

const Blog = () => {
  const [blogArticles, setBlogArticles] = useState([]);

  useQuery(fetchBlogArticles, {
    onCompleted: ({ fetchBlogArticles }) => setBlogArticles(fetchBlogArticles),
  });

  return (
    <div className="flex flex-col px-40">
      <Header headerArticles={blogArticles.slice(0, 5)} />
      <SearchSection />

      <div className="grid grid-cols-3 w-full gap-5 pb-5">
        {blogArticles.map((post, i) => (
          <MiniPost key={i} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
