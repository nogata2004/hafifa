import { gql } from "@apollo/client";

//mymutation
export const ADD_SONG_TO_PLAYLIST = gql`
mutation MyMutation($playlistId: UUID!, $songId: UUID!) {
    createPlaylistSong(
      input: {playlistSong: {playlistId: $playlistId, songId: $songId}}
    ) {
      playlistSong {
        songId
      }
    }
  }
`

export const DELETE_PLAYLIST_SONG = gql`
mutation MyMutation($playlistId: UUID!, $songId: UUID!) {
    deletePlaylistSongByPlaylistIdAndSongId(
      input: {playlistId: $playlistId, songId: $songId}
    ) {
      clientMutationId
      deletedPlaylistSongId
    }
  }
`