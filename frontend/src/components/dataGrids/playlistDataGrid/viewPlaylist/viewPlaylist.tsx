import { useContext } from 'react';
import { Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import React from 'react';

import useStyles from './viewPlaylistStyle';
import GenericDataTable from '../../../../commons/genericDataGrid/genericDataGrid';
import { AllSongsContext } from '../../../db/context';
import Playlist from '../../../../types/playlist';
import EditPlaylistDialog from './editPlaylistDialog/editPlaylistDialog';


interface Props {
    methods: UseFormReturn<any, any, undefined>;
    currentPlaylist: Playlist;
};

const ViewPlaylist: React.FC<Props> = ({ methods, currentPlaylist }) => {
    const classes = useStyles();
    const { songs } = useContext(AllSongsContext);

    return (
        <div>
            <div className={classes.title}>
                <EditPlaylistDialog
                    currentPlaylist={currentPlaylist}
                    methods={methods}
                />

                <Typography className={classes.playlistTitle}>
                    {currentPlaylist.name}
                </Typography>
            </div>

            <GenericDataTable
                filterSongs={songs.filter((song) => (currentPlaylist.songsID.includes(song.id)))}
            />
        </div>
    );
};

export default ViewPlaylist;