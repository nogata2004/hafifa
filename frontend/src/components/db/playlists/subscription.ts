import { gql } from '@apollo/client';

export const SUB_UPDATE_PLAYLIST = gql`
  subscription subUpdatePlaylist {
    listen(topic: "updatePlaylistsTable") {
      relatedNode {
        ... on Playlist {
          id
          name
        }
      }
    }
  }
`;
