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
      actualPrice
      position
      totalStats {
        totalGoals
        totalAssists
      }
      seasonRecords {
        yearStart
        yearFinish
        goals
        assists
      }
    }
  }
`;