import { gql } from "@apollo/client";

export const fetchOwnPlayers = gql `
  query ($team: FetchOwnPlayersInput!) {
    fetchOwnPlayers(team: $team) {
      _id
      fullName
      image
    }
  }
`;