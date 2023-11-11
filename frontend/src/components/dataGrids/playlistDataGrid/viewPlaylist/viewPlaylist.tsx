import { useContext } from 'react';
import { Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import React from 'react';

import useStyles from './viewPlaylistStyle';
import GenericDataTable from '../../../../commons/genericDataGrid/genericDataGrid';
import { AllSpoofyContext } from '../../../db/context';
import Playlist from '../../../../types/playlist';
import EditPlaylistDialog from './editPlaylistDialog/editPlaylistDialog';

interface Props {
  methods: UseFormReturn<any, any, undefined>;
  currentPlaylist: Playlist;
  setCurrentPlaylist: React.Dispatch<
    React.SetStateAction<Playlist | undefined>
  >;
}

const ViewPlaylist: React.FC<Props> = ({
  // todo: rename to playlist
  methods,
  currentPlaylist,
  setCurrentPlaylist,
}) => {
  const classes = useStyles();
  const { songs } = useContext(AllSpoofyContext);

  return (
    <div>
      {' '}
      {/* <></> todo! */}
      <div className={classes.title}>
        <EditPlaylistDialog
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
    </div>
  );
};

export default ViewPlaylist;
