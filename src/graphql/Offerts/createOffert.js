import { gql } from "@apollo/client";

export const createOffert = gql`
  mutation ($offert: CreateOffertInput!) {
    createOffert(offert: $offert)
  }
`;
