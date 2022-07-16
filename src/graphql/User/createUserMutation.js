import { gql } from "@apollo/client/core";

export const createUserMutation = gql`
  mutation ($user: UserInput!) {
    createUser(user: $user) {
      username
      image
      token
    }
  }
`;
