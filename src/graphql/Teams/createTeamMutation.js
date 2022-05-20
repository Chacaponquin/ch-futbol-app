import { gql } from "@apollo/client";

export const createTeamMutation = gql `
  mutation ($team: TeamInput!) {
    createTeam(team: $team)
  }
`;