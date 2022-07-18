import { gql } from "@apollo/client";

export const getAllMessagesUser = gql`
  query ($id: ID!) {
    getAllMessagesUser(userID: $id) {
      content
    }
  }
`;
