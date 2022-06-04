import React from "react";
import test from "../../../../assets/test.jpg";

const ArticleContent = ({ article }) => {
  return (
    <div className="w-full">
      {article && (
        <div>
          <div className="w-full">
            <img
              src={test}
              alt={article.title}
              className="w-full h-[300px] object-cover rounded-md"
            />
            <h1 className="font-monserratBold text-3xl py-5 mb-0 esm:text-xl esm:py-3">
              {article.title}
            </h1>
          </div>

          <div className="flex items-center"></div>

          <div className="text-lg esm:text-base">{article.content}</div>
        </div>
      )}
    </div>
  );
};

export default ArticleContent;
