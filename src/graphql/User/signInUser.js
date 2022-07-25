import { gql } from "@apollo/client";

const userSignInFragment = gql`
  fragment UserSignInFragment on User {
    username
    image
    email
    role
    isAdmin
    _id
    elementsOwner {
      __typename
      ... on Player {
        playerID: _id
        image
        fullName
      }
      ... on Team {
        leagueID: league
      }
      ... on Trainer {
        trainerID: _id
      }
    }
  }
`;

export const getUserByToken = gql`
  ${userSignInFragment}

  query {
    getUserByToken {
      ...UserSignInFragment
    }
  }
`;

export const loginUser = gql`
  ${userSignInFragment}

  query ($user: LoginUserInput!) {
    loginUser(user: $user) {
      ...UserSignInFragment
      token
    }
  }
`;

export const createUserMutation = gql`
  ${userSignInFragment}

  mutation ($user: UserInput!) {
    createUser(user: $user) {
      ...UserSignInFragment
      token
    }
  }
`;
