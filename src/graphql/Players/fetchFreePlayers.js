import { gql } from "@apollo/client";

export const fetchFreePlayers = gql `
  query {
    findFreePlayers {
      _id
      fullName
      image
    }
  }
`;