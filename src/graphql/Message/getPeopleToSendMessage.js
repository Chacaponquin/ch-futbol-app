import { gql } from "@apollo/client";

export const getPeopleToSendMessage = gql`
  query ($elementID: ID) {
    getPeopleToSendMessage(elementID: $elementID) {
      __typename
      ... on Player {
        playerID: _id
        fullName
        image
      }
      ... on Team {
        leagueID: league
      }
      ... on Trainer {
        trainerID: _id
      }
      ... on User {
        userID: _id
        username
        image
      }
    }
  }
`;
