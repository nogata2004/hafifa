import { useContext } from 'react';
import { Typography } from '@mui/material';
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';
import React from 'react';

import useStyles from './viewPlaylistStyle';
import GenericDataTable from '../../../../commons/genericDataGrid/genericDataGrid';
import { AllSongsContext } from '../../../db/context';
import Playlist from '../../../../types/playlist';
import EditPlaylistDialog from './editPlaylistDialog/editPlaylistDialog';


interface Props {
    currentPlaylist: Playlist;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    reset: UseFormReset<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
};

const ViewPlaylist: React.FC<Props> = ({ currentPlaylist, handleSubmit, reset, register, errors }) => {
    const classes = useStyles();
    const { songs } = useContext(AllSongsContext);

    return (
        <div>
            <div className={classes.title}>
                <EditPlaylistDialog
                    currentPlaylist={currentPlaylist}
                    handleSubmit={handleSubmit}
                    reset={reset}
                    register={register}
                    errors={errors}
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