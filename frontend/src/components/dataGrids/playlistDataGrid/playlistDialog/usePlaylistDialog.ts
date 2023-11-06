import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import Playlist from '../../../../types/playlist';
import { CREATE_PLAYLIST } from '../../../db/playlists/mutation';
import { AllSpoofyContext } from '../../../db/context';
import { ADD_SONG_TO_PLAYLIST } from '../../../db/playlistSong/mutation';
import Song from '../../../../types/song';
import { useAppSelector } from '../../../../redux/hooks';

interface Props {
    methods: UseFormReturn<any, any, undefined>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const usePlaylistDialog = (props: Props) => {
    const {methods, setOpen} = props;
    const currentUser = useAppSelector((state) => state.user.value);
    const [mutationCreatePlaylist] = useMutation(CREATE_PLAYLIST);
    const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const { setPlaylists } = useContext(AllSpoofyContext);
  
    const actionAddPlaylist = (data: FieldValues) => {
      mutationCreatePlaylist({
        variables: {
          name: data.name,
          userId: currentUser!.id,
        },
        onCompleted(dataCreatePlaylist) {
          const dataPlaylist = dataCreatePlaylist.createPlaylist.playlist;
          const newPlaylist: Playlist = {
            id: dataPlaylist.id,
            name: dataPlaylist.name,
            songsID: [],
          };
          setPlaylists((prev) => [...prev, newPlaylist]);
  
          data.inputSongs.map((song: Song) => {
            mutationAddSongToPlaylist({
              variables: {
                playlistId: dataPlaylist.id,
                songId: song.id,
              },
              onCompleted(dataSongToPlaylist) {
                const dataPlaylistSong =
                  dataSongToPlaylist.createPlaylistSong.playlistSong;
                setPlaylists((prev) =>
                  prev.map((playlist) => {
                    if (playlist.id === dataPlaylist.id) {
                      playlist.songsID.push(dataPlaylistSong.songId);
                      return playlist;
                    }
                    return playlist;
                  })
                );
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
