import { gql } from '@apollo/client';

//myquery
export const SUB_UPDATE_PLAYLIST = gql`
  subscription MySubscription {
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
