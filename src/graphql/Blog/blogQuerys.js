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