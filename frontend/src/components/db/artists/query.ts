import { gql } from "@apollo/client";

export const GET_ALL_ARTISTS = gql`
query MyQuery {
    allArtists {
      nodes {
        id
        name
      }
    }
  }
`