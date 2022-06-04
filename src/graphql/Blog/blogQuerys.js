import { gql } from "@apollo/client";

export const fetchBlogArticles = gql `
  query {
    fetchBlogArticles {
      _id
      resume
      content
      author
      title
      createdAt
    }
  }
`;

export const findBlogArticleById = gql `
  query ($article: ArticleInput!) {
    findBlogArticleById(article: $article) {
      _id
      resume
      content
      author
      title
      likes
      createdAt
    }
  }
`;