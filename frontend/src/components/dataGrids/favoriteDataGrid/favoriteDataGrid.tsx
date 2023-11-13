import React, { useContext } from 'react';

import GenericDataTable from '../../../commons/genericDataGrid/genericDataGrid';
import useStyles from '../playlistDataGrid/playlistDataGridStyle';
import { AllSpoofyContext } from '../../db/context';

const FavoriteDataGrid: React.FC = () => {
  const classes = useStyles();
  const { songs } = useContext(AllSpoofyContext);

  return (
    <div className={classes.body}>
      <GenericDataTable songs={songs.filter((song) => song.isFavorite)} />
    </div>
  );
};

export default FavoriteDataGrid;
