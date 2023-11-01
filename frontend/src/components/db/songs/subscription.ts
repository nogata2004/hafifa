import { gql } from "@apollo/client";

// mysub
export const ADD_SONG_SUB = gql`
subscription MySubscription {
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
`