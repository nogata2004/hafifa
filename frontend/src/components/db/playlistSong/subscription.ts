import { gql } from '@apollo/client';

//myquery
export const SUB_INSERT_PLAYLIST_SONG = gql`
  subscription subInsertPlaylistSong {
    listen(topic: "insertlaylistSongsTable") {
      relatedNode {
        ... on PlaylistSong {
          __typename
          songId
          playlistId
        }
      }
    }
  }
`;

export const SUB_DELETE_PLAYLIST_SONG = gql`
  subscription subDeletePlaylistSong {
    listen(topic: "deletePlaylistSongsTable") {
      relatedNode {
        ... on PlaylistSong {
          __typename
          songId
          playlistId
        }
      }
      relatedNodeId
    }
  }
`;
