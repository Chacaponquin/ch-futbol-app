import { gql } from "@apollo/client";

export const deleteMesseges = gql`
  mutation ($messageInf: DeleteMessagesInput!) {
    deleteMessages(messagesInf: $messageInf)
  }
`;
