import { gql } from '@apollo/client';

export const ADD_SONG_SUB = gql`
  subscription addSongSub {
    listen(topic: "notify_new_song") {
      relatedNode {
        ... on Song {
          id
          name
          artistId
          duration
        }
      }
    }
  }
`;
