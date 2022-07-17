import { gql } from "@apollo/client";

export const getUserByToken = gql`
  query ($token: UserTokenInput!) {
    getUserByToken(token: $token) {
      username
      image
      email
      _id
    }
  }
`;
