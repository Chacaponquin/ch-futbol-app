import { gql } from "@apollo/client";

export const getAllMessagesUser = gql`
  query ($elementID: ID) {
    getAllMessagesUser(elementID: $elementID) {
      _id
      content
      title
      from {
        __typename
        ... on Player {
          playerID: _id
          image
          name: fullName
        }
        ... on Team {
          teamID: _id
          name
          league
          image
        }
        ... on Trainer {
          trainerID: _id
          name: fullName
          image
        }
        ... on User {
          userID: _id
          name: username
          image
          isAdmin
          role
        }
      }
    }
  }
`;
