import { gql } from "@apollo/client";

export const getOffertsById = gql`
  query ($elementID: ID!) {
    getOffertsById(elementID: $elementID) {
      _id
    }
  }
`;
