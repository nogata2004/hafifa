import { useMutation } from '@apollo/client';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import React from 'react';

import { EDIT_PLAYLIST } from '../../../../db/playlists/mutation';
import {
  ADD_SONG_TO_PLAYLIST,
  DELETE_PLAYLIST_SONG,
} from '../../../../db/playlistSong/mutation';
import Song from '../../../../../types/song';
import Playlist from '../../../../../types/playlist';

interface Props {
  methods: UseFormReturn<any, any, undefined>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlaylist: Playlist;
  setCurrentPlaylist: React.Dispatch<
    React.SetStateAction<Playlist | undefined>
  >;
}

export const useEditPlaylist = (props: Props) => {
  const { methods, setOpen, currentPlaylist, setCurrentPlaylist } = props;
  const [mutationEditPlaylist] = useMutation(EDIT_PLAYLIST); // todo rename
  const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
  const [mutationDeleteSongPlaylist] = useMutation(DELETE_PLAYLIST_SONG);

  const actionEditPlaylist = (data: FieldValues) => {
    // rename data to form/fields todo
    if (currentPlaylist.name !== data.name) {
      mutationEditPlaylist({
        variables: {
          id: currentPlaylist.id,
          name: data.name,
        },
      });
    }

    const newSongsId: string[] = data.inputSongs.map((song: Song) => song.id); // songIds todo
    if (currentPlaylist.songsID !== newSongsId) {
      newSongsId.forEach((songId: string) => {
        // foreach - done
        if (!currentPlaylist.songsID.includes(songId!)) {
          mutationAddSongToPlaylist({
            variables: {
              playlistId: currentPlaylist.id,
              songId: songId,
            },
          });
        }
      });
      currentPlaylist.songsID.forEach((songId) => {
        // make function of these loops
        if (!newSongsId.includes(songId)) {
          mutationDeleteSongPlaylist({
            variables: {
              playlistId: currentPlaylist.id,
              songId: songId,
            },
          });
        }
      });
      setOpen(false);
      methods.reset();
    }
  };

  const openDialog = () => {
    setOpen(true);
    setCurrentPlaylist(currentPlaylist);
  };

  return { actionEditPlaylist, openDialog };
};
