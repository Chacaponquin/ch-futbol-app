import { gql } from "@apollo/client";

export const deletePlayer = gql `
  mutation ($players: DeletePlayerInput!) {
    deletePlayer(players: $players)
  }
`;