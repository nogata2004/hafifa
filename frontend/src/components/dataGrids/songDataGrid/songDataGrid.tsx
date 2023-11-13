import React, { useContext } from 'react';

import GenericDataTable from '../../../commons/genericDataGrid/genericDataGrid';
import useStyles from '../playlistDataGrid/playlistDataGridStyle';
import { AllSpoofyContext } from '../../db/context';
import SongDialog from './songDialog/songDialog';

const SongDataGrid: React.FC = () => {
  const classes = useStyles();
  const { songs } = useContext(AllSpoofyContext);

  return (
    <div className={classes.body}>
      <GenericDataTable songs={songs} />

      <SongDialog />
    </div>
  );
};

export default SongDataGrid;
