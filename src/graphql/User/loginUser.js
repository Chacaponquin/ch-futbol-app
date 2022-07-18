import { gql } from "@apollo/client";

export const loginUser = gql`
  query ($user: LoginUserInput!) {
    loginUser(user: $user) {
      username
      image
      email
      role
      isAdmin
      _id
      token
    }
  }
`;
