import React, { useContext } from 'react';
import { Typography } from '@mui/material';

import GenericDataTable from '../../../commons/genericDataGrid/genericDataGrid';
import useStyles from '../playlistDataGrid/playlistDataGridStyle';
import { AllSongsContext } from '../../db/context';


const TITLE_TEXT = 'רשימת מועדפים';

const favoriteDataGrid: React.FC = () => {
    const classes = useStyles();
    const { songs } = useContext(AllSongsContext);

    return (
        <div className={classes.body}>
            <Typography className={classes.title}>
                {TITLE_TEXT}
            </Typography>

            <GenericDataTable
                filterSongs={songs.filter((song) => (song.isFavorite))}
            />
        </div>
    );
};

export default favoriteDataGrid;