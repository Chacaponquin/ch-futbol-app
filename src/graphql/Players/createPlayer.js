import { gql } from "@apollo/client";

export const createPlayer = gql `
  mutation ($player: PlayerInput!) {
    createPlayer(player: $player)
  }
`;