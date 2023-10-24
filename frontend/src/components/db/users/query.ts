import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
query MyQuery {
    allUsers {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`
