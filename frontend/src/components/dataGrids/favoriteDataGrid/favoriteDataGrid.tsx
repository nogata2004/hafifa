import React, { useContext } from 'react';
import { Typography } from '@mui/material';

import GenericDataTable from '../../../commons/genericDataGrid/genericDataGrid';
import useStyles from '../playlistDataGrid/playlistDataGridStyle';
import { AllSpoofyContext } from '../../db/context';


const TITLE = 'רשימת מועדפים';

const FavoriteDataGrid: React.FC = () => {
    const classes = useStyles();
    const { songs } = useContext(AllSpoofyContext);

    return (
        <div className={classes.body}>
            <Typography className={classes.title}>
                {TITLE}
            </Typography>

            <GenericDataTable
                filterSongs={songs.filter((song) => (song.isFavorite))}
            />
        </div>
    );
};

export default FavoriteDataGrid;