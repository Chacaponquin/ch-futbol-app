import { gql } from "@apollo/client";

export const getUserByToken = gql`
  query ($token: String!) {
    getUserByToken(token: $token) {
      username
      image
      email
      role
      category
      _id
    }
  }
`;
