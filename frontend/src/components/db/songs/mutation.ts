import { gql } from "@apollo/client";

//mymutation
export const CREATE_SONG = gql`
mutation MyMutation($artistId: UUID! , $duration: Int!, $name: String!) {
    createSong(
      input: {song: {name: $name, artistId: $artistId, duration: $duration}}
    ) {
      song {
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


