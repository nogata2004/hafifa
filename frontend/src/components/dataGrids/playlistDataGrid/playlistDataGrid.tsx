import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import useStyles from './playlistDataGridStyle';
import ViewPlaylist from './viewPlaylist/viewPlaylist';
import { AllPlaylistsContext } from '../../db/context';
import PlaylistDialog from './playlistDialog/playlistDialog';


const TITLE_TEXT = 'רשימת פלייליסטים';
const REQUIRED_ERROR = 'שדה הכרחי';
const TYPE_NAME_ERROR = 'שדה הכרחי מורכב מאותיות בלבד';

const playlistsSchema = yup.object({
    name: yup.string().matches(/^[a-z, א-ת]+$/, TYPE_NAME_ERROR).required(REQUIRED_ERROR),
    inputSongs: yup.array().of(yup.object()).min(0)
});

const PlaylistDataGrid: React.FC = () => {
    const classes = useStyles();
    const { playlists } = useContext(AllPlaylistsContext);

    const defaultValues = {
        name: '',
        inputSongs: [],
    };

    const methods = useForm({
        resolver: yupResolver(playlistsSchema),
        defaultValues: defaultValues
    });


    return (
        <div className={classes.body}>
            <Typography className={classes.title}>
                {TITLE_TEXT}
            </Typography>

            <div className={classes.tables}>
                {playlists.map((playlist) => (
                    <div key={playlist.id}>
                        <ViewPlaylist
                            methods={methods}
                            currentPlaylist={playlist}
                        />
                    </div>
                ))}
            </div>

            <PlaylistDialog
                methods={methods}
            />
        </div>
    );
};

export default PlaylistDataGrid;

