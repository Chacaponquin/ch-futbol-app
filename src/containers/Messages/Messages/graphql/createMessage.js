import { gql } from "@apollo/client";

export const createMessage = gql`
  mutation ($msg: CreateMessageInput!) {
    createMessage(message: $msg)
  }
`;
