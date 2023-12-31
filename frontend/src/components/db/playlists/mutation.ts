import { gql } from "@apollo/client";

export const CREATE_PLAYLIST = gql`
mutation MyMutation($name: String!, $userId: UUID!) {
    createPlaylist(input: {playlist: {name: $name, userId: $userId}}) {
      playlist {
        id
        name
        userId
      }
    }
  }  
`

export const EDIT_PLAYLIST = gql`
mutation MyMutation($id: UUID!, $name: String!) {
  updatePlaylistById(input: {playlistPatch: {name: $name}, id: $id}) {
    playlist {
      name
    }
  }
}
`