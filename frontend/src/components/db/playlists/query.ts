import { gql } from '@apollo/client';

//myquery
export const GET_PLAYLISTS_BY_USER = gql`
query MyQuery($userId: UUID!) {
  allPlaylists(condition: {userId: $userId}) {
    nodes {
      id
      name
      playlistSongsByPlaylistId {
        nodes {
          songId
        }
      }
    }
  }
}
`
