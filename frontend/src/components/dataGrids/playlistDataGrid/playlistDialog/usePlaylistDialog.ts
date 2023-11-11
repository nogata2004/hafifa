import React from 'react';
import { useMutation } from '@apollo/client';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { CREATE_PLAYLIST } from '../../../db/playlists/mutation';
import { ADD_SONG_TO_PLAYLIST } from '../../../db/playlistSong/mutation';
import Song from '../../../../types/song';
import { useAppSelector } from '../../../../redux/hooks';

interface Props {
  methods: UseFormReturn<any, any, undefined>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePlaylistDialog = (props: Props) => {
  const { methods, setOpen } = props;
  const currentUser = useAppSelector((state) => state.user.value);
  const [mutationCreatePlaylist] = useMutation(CREATE_PLAYLIST); // todo mutation name
  const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);

  const actionAddPlaylist = (data: FieldValues) => {
    // todo rename data to form or fields
    mutationCreatePlaylist({
      variables: {
        name: data.name,
        userId: currentUser!.id,
      },
      onCompleted(dataCreatePlaylist) {
        // rename to data todo
        const dataPlaylist = dataCreatePlaylist.createPlaylist.playlist;

        data.inputSongs.forEach((song: Song) => {
          // flrech - done
          mutationAddSongToPlaylist({
            variables: {
              playlistId: dataPlaylist.id,
              songId: song.id,
            },
            onCompleted() {
              methods.reset();
              setOpen(false);
            },
          });
        });
      },
    });
  };

  return { actionAddPlaylist };
};
