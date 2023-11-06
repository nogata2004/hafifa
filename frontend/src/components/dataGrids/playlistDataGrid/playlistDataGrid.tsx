import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import useStyles from './playlistDataGridStyle';
import ViewPlaylist from './viewPlaylist/viewPlaylist';
import { AllSpoofyContext } from '../../db/context';
import PlaylistDialog from './playlistDialog/playlistDialog';
import { playlistDialogValidationSchema } from './playlistSchema';
import Playlist from '../../../types/playlist';

const TITLE = 'רשימת פלייליסטים';

const PlaylistDataGrid: React.FC = () => {
  const classes = useStyles();
  const { playlists, songs } = useContext(AllSpoofyContext);
  const [currentPlaylist, setCurrentPlaylist] = React.useState<
    Playlist | undefined
  >(undefined);

  const defaultValues = (playlist: Playlist | undefined) => {
    if (!!playlist) {
      return {
        name: playlist.name,
        inputSongs: playlist.songsID.map((songId) =>
          songs.find((song) => song.id === songId)
        ),
      };
    } else {
      return {
        name: '',
        inputSongs: [],
      };
    }
  };

  const methods = useForm({
    resolver: yupResolver(playlistDialogValidationSchema),
    defaultValues: defaultValues(currentPlaylist),
  });

  useEffect(() => {
    console.log(currentPlaylist);
    methods.reset(defaultValues(currentPlaylist));
  }, [currentPlaylist]);

  return (
    <div className={classes.body}>
      <Typography className={classes.title}>{TITLE}</Typography>

      <div className={classes.tables}>
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <ViewPlaylist
              methods={methods}
              currentPlaylist={playlist}
              setCurrentPlaylist={setCurrentPlaylist}
            />
          </div>
        ))}
      </div>

      <PlaylistDialog
        methods={methods}
        setCurrentPlaylist={setCurrentPlaylist}
      />
    </div>
  );
};

export default PlaylistDataGrid;
