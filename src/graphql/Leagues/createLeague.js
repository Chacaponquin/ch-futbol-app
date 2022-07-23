import { gql } from "@apollo/client";

export const createLeague = gql`
  mutation ($league: CreateLeagueInput!) {
    createLeague(league: $league)
  }
`;
