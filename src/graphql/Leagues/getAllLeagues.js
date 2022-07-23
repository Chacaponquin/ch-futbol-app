import { gql } from "@apollo/client";

export const getAllLeagues = gql`
  query {
    getAllLeagues {
      name
      _id
    }
  }
`;
