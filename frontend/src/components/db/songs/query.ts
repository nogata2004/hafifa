import { gql } from "@apollo/client";

export const GET_ALL_SONGS = gql`
query MyQuery($userId: UUID!) {
  allSongs {
    nodes {
      favoritesBySongId(condition: {userId: $userId}) {
        totalCount
      }
      id
      name
      duration
      artistByArtistId {
          id
          name
        }
    }
  }
}
`



