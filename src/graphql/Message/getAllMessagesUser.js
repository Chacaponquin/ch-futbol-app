import { gql } from "@apollo/client";

export const getAllMessagesUser = gql`
  query {
    getAllMessagesUser {
      _id
      from {
        __typename
        ... on Player {
          playerID: image
        }
        ... on Team {
          leagueID: league
        }
        ... on Trainer {
          trainerID: _id
        }
        ... on User {
          userID: _id
        }
      }
    }
  }
`;
