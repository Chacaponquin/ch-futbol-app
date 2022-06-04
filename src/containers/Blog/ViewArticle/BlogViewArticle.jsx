import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { findBlogArticleById } from "../../../graphql/Blog/blogQuerys";
import Loader from "../../../shared/Loader/Loader";
import ArticleContent from "./components/ArticleContent";
import Rate from "./components/Rate";
import RecArticle from "./components/RecArticle";

const BlogViewArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  const { loading } = useQuery(findBlogArticleById, {
    variables: { article: { id } },
    onCompleted: ({ findBlogArticleById }) => setArticle(findBlogArticleById),
    onError: () => navigate("/blog"),
  });

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader className="w-[200px] h-[200px] esm:w-[150px] esm:h-[150px]" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-52 exsm:px-3 esm:px-6 sm:px-12 md:px-24 lg:px-52">
      <ArticleContent article={article} />
      <RecArticle />
      <Rate />
    </div>
  );
};

export default BlogViewArticle;
