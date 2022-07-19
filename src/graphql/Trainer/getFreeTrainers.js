import { gql } from "@apollo/client";

export const getFreeTrainers = gql`
  query {
    getFreeTrainers {
      _id
      fullName
      image
    }
  }
`;
