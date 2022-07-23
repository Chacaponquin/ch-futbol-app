import { gql } from "@apollo/client";

export const getAllCountries = gql`
  query {
    getCountryList
  }
`;
