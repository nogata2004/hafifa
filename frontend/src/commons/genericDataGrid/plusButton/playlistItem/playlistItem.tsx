import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { useMutation } from '@apollo/client';

import useStyles from './playlistItemStyle';
import { ADD_SONG_TO_PLAYLIST } from '../../../../components/db/playlistSong/mutation';
import { AllSpoofyContext } from '../../../../components/db/context';
import Playlist from '../../../../types/playlist';
import { PlaylistMode } from '../PlusButton';

interface Props {
  songId: string;
  currentPlaylist: Playlist;
  setCurrentPlaylistMode: React.Dispatch<React.SetStateAction<PlaylistMode>>;
}

const PlaylistItem: React.FC<Props> = ({
  songId,
  currentPlaylist,
  setCurrentPlaylistMode,
}) => {
  const classes = useStyles();
  const [addSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
  const { playlists, setPlaylists } = useContext(AllSpoofyContext);

  const addToPlaylist = (currentPlaylist: Playlist) => {
    if (currentPlaylist.songsID.includes(songId)) {
      setCurrentPlaylistMode(PlaylistMode.EXIST);
    } else {
      addSongToPlaylist({
        variables: {
          playlistId: currentPlaylist.id,
          songId: songId,
        },
        onCompleted(data) {
          const dataPlaylistSong = data.createPlaylistSong.playlistSong;
          setPlaylists((prev) =>
            prev.map((playlist) => {
              if (playlist.id === currentPlaylist.id) {
                playlist.songsID.push(dataPlaylistSong.songId);
                return playlist;
              }
              return playlist;
            })
          );
          setCurrentPlaylistMode(PlaylistMode.NOT_EXIST);
        },
      });
    }
  };

  return (
    <div>
      <Typography
        key={currentPlaylist.id}
        onClick={() => addToPlaylist(currentPlaylist)}
        className={classes.playlistItem}
      >
        {currentPlaylist.name}
      </Typography>
    </div>
  );
};

export default PlaylistItem;
