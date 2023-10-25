import React, { useContext } from 'react';
import { Typography } from '@mui/material';

import GenericDataTable from '../../../commons/genericDataGrid/genericDataGrid';
import useStyles from '../playlistDataGrid/playlistDataGridStyle';
import { AllSongsContext } from '../../db/context';
import SongDialog from './songDialog/songDialog';


const TITLE_TEXT = 'רשימת שירים';

const SongDataGrid: React.FC = () => {
    const classes = useStyles();
    const { songs } = useContext(AllSongsContext);

    return (
        <div className={classes.body}>
            <Typography className={classes.title}>
                {TITLE_TEXT}
            </Typography>

            <GenericDataTable
                filterSongs={songs}
            />

            <SongDialog />
        </div>
    );
};

export default SongDataGrid;