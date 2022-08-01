import { gql } from "@apollo/client";

export const createReply = gql`
  mutation ($reply: CreateReplyInput!) {
    createReply(reply: $reply)
  }
`;
