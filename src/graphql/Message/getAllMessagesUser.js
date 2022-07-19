import { gql } from "@apollo/client";

export const getAllMessagesUser = gql`
  query ($id: ID!) {
    getAllMessagesUser(userID: $id) {
      content
      from {
        username
        _id
        image
        isAdmin
        role
      }
      _id
      title
    }
  }
`;
