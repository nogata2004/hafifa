import { gql } from '@apollo/client';

export const ADD_SONG_TO_PLAYLIST = gql`
  mutation addSongToPlaylist($playlistId: UUID!, $songId: UUID!) {
    createPlaylistSong(
      input: { playlistSong: { playlistId: $playlistId, songId: $songId } }
    ) {
      playlistSong {
        songId
      }
    }
  }
`;

export const DELETE_PLAYLIST_SONG = gql`
  mutation deletePlaylistSong($playlistId: UUID!, $songId: UUID!) {
    deletePlaylistSongByPlaylistIdAndSongId(
      input: { playlistId: $playlistId, songId: $songId }
    ) {
      clientMutationId
      deletedPlaylistSongId
    }
  }
`;
