import { gql } from "@apollo/client";

export const fetchAllPlayers = gql`
  query {
    fetchAllPlayers {
      _id
      fullName
      image
      country
      age
      gender
      actualPrice
      position
      totalStats {
        totalGoals
        totalAssists
      }
      seasonRecords {
        yearStart
        yearFinish
        assists
        goals
      }
    }
  }
`;
