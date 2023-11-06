import React, { useContext } from 'react';
import { Typography } from '@mui/material';

import GenericDataTable from '../../../commons/genericDataGrid/genericDataGrid';
import useStyles from '../playlistDataGrid/playlistDataGridStyle';
import { AllSpoofyContext } from '../../db/context';
import SongDialog from './songDialog/songDialog';

const TITLE = 'רשימת שירים'; // just title - done

const SongDataGrid: React.FC = () => {
  const classes = useStyles();
  const { songs } = useContext(AllSpoofyContext);

  return (
    <div className={classes.body}>
      <Typography className={classes.title}>{TITLE}</Typography>

      <GenericDataTable filterSongs={songs} />

      <SongDialog />
    </div>
  );
};

export default SongDataGrid;
