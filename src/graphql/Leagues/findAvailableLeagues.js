import { gql } from "@apollo/client";

export const findAvailableLeagues = gql `
  query {
    findAvailibleLeagues {
      _id
      name
    }
  }
`;