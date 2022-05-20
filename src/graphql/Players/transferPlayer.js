import { gql } from "@apollo/client";

export const transferPlayer = gql `
  mutation ($data: TransferPlayerInput!) {
    transferPlayer(data: $data)
  }
`;