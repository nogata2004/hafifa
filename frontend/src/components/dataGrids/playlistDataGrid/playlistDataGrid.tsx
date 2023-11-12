import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import useStyles from './playlistDataGridStyle';
import PlaylistItem from './viewPlaylist/playlistItem';
import { AllSpoofyContext } from '../../db/context';
import PlaylistDialog from './playlistDialog/playlistDialog';
import { playlistDialogValidationSchema } from './validationSchema';
import Playlist from '../../../types/playlist';

const TITLE = 'רשימת פלייליסטים';

export enum PlaylistKeys {
  NAME = 'name',
  INPOUT_SONG = 'songs',
}

const PlaylistDataGrid: React.FC = () => {
  const classes = useStyles();
  const { playlists, songs } = useContext(AllSpoofyContext); // unused - done // done is necessary playlists in context -done:
  // needed in: plusButton in deta grid, playlistpage
  const [currentPlaylist, setCurrentPlaylist] = React.useState<
    Playlist | undefined
  >(undefined);

  const defaultValues = (playlist: Playlist | undefined) => {
    if (!!playlist) {
      return {
        [PlaylistKeys.NAME]: playlist.name,
        [PlaylistKeys.INPOUT_SONG]: playlist.songsID.map((songId) =>
          songs.find((song) => song.id === songId)
        ),
      };
    } else {
      return {
        [PlaylistKeys.NAME]: '',
        [PlaylistKeys.INPOUT_SONG]: [],
      };
    }
  };

  const methods = useForm({
    resolver: yupResolver(playlistDialogValidationSchema),
    defaultValues: defaultValues(currentPlaylist),
  });

  useEffect(() => {
    methods.reset(defaultValues(currentPlaylist));
  }, [currentPlaylist]);

  return (
    <div className={classes.body}>
      <Typography className={classes.title}>{TITLE}</Typography>{' '}
      {/*todo, extract upwards in tree - לעשות קומפננטה גנרית נוספת שמכילה את הכותרת ואז שולחת למודים*/}
      <div className={classes.tables}>
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <PlaylistItem
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
