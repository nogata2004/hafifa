import { gql } from '@apollo/client';

export const GET_PLAYLISTS_BY_USER = gql`
  query getPlaylistByUser($userId: UUID!) {
    allPlaylists(condition: { userId: $userId }) {
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
`;
