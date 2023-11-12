import { useContext } from 'react';
import { Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import React from 'react';

import useStyles from './playlistItemStyle';
import GenericDataTable from '../../../../commons/genericDataGrid/genericDataGrid';
import { AllSpoofyContext } from '../../../db/context';
import Playlist from '../../../../types/playlist';
import EditPlaylistButton from './editPlaylistButton/editPlaylistButton';

interface Props {
  methods: UseFormReturn<any, any, undefined>;
  currentPlaylist: Playlist;
  setCurrentPlaylist: React.Dispatch<
    React.SetStateAction<Playlist | undefined>
  >;
}

const PlaylistItem: React.FC<Props> = ({
  // done (without the folder): rename to playlist
  methods,
  currentPlaylist,
  setCurrentPlaylist,
}) => {
  const classes = useStyles();
  const { songs } = useContext(AllSpoofyContext);

  return (
    <>
      {' '}
      {/* <></> todo! */}
      <div className={classes.title}>
        <EditPlaylistButton
          currentPlaylist={currentPlaylist}
          methods={methods}
          setCurrentPlaylist={setCurrentPlaylist}
        />

        <Typography className={classes.playlistTitle}>
          {currentPlaylist.name}
        </Typography>
      </div>
      <GenericDataTable
        songs={songs.filter((song) =>
          currentPlaylist.songsID.includes(song.id)
        )}
      />
    </>
  );
};

export default PlaylistItem;
