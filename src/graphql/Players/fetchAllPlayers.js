import { gql } from "@apollo/client";

export const fetchAllPlayers = gql `
  query {
    fetchAllPlayers {
      _id
      fullName
      image
      country
      age
      gender
      actualTeamInf {
        image
        name
      }
      price
    }
  }
`;