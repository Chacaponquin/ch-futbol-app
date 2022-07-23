import { gql } from "@apollo/client";

export const deletePlayer = gql`
  mutation ($players: [ID]!) {
    deletePlayer(players: $players)
  }
`;
