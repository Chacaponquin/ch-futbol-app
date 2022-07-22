import { gql } from "@apollo/client";

export const getUserByToken = gql`
  query {
    getUserByToken {
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
        }
        ... on Team {
          leagueID: league
        }
        ... on Trainer {
          trainerID: _id
        }
      }
    }
  }
`;
