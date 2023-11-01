import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import React from 'react';

import useStyles from './editPlaylistDialogStyle';
import { AllSongsContext } from '../../../../db/context';
import { AllPlaylistsContext } from '../../../../db/context';
import Playlist from '../../../../../types/playlist';
import GenericDialog from '../../../../../commons/genericDialog/genericDialog';
import { EDIT_PLAYLIST } from '../../../../db/playlists/mutation';
import GenericAutocomplete from '../../../../../commons/genericAutocomplete/genericAutocomplete';
import GenericTextField from '../../../../../commons/genericTextField/genericTextField';
import { ADD_SONG_TO_PLAYLIST, DELETE_PLAYLIST_SONG } from '../../../../db/playlistSong/mutation';
import Song from '../../../../../types/song';

const NAME = 'שם';
const SONGS = 'שירים';
const SUBMIT_BUTTON_TEXT = 'שמור';
const DIALOG_TITLE = 'עריכת פלייליסט';

interface Props {
    currentPlaylist: Playlist;
    methods: UseFormReturn<any, any, undefined>;
};

const EditPlaylistDialog: React.FC<Props> = ({ currentPlaylist, methods }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const [mutationEditPlaylist] = useMutation(EDIT_PLAYLIST);
    const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const [mutationDeleteSongPlaylist] = useMutation(DELETE_PLAYLIST_SONG);
    const { songs } = useContext(AllSongsContext);
    const { setPlaylists } = useContext(AllPlaylistsContext);

    const actionEditPlaylist = (data: FieldValues) => {
        if (currentPlaylist.name !== data.name) {
            mutationEditPlaylist({
                variables: {
                    id: currentPlaylist.id,
                    name: data.name
                },
                onCompleted() {
                    setPlaylists!(prev => prev.map((playlist) => {
                        if (playlist.id === currentPlaylist.id) {
                            return { ...playlist, name: data.name }
                        }
                        return playlist;
                    }));
                }
            })
        };

        // if (typeof (data.name ) != 'string' && songsInput !== null) {
            const songsId: string[] = data.inputSongs.map((song: Song) => song.id);
            if (currentPlaylist.songsID !== songsId) {
                songsId.map((songId: string) => {
                    if (!currentPlaylist.songsID.includes(songId!)) {
                        mutationAddSongToPlaylist({
                            variables: {
                                playlistId: currentPlaylist.id,
                                songId: songId,
                            }
                        })
                    }
                })

                currentPlaylist.songsID.map((songId) => {
                    if (!songsId?.includes(songId)) {
                        mutationDeleteSongPlaylist({
                            variables: {
                                playlistId: currentPlaylist.id,
                                songId: songId,
                            }
                        })
                    }
                })

                setPlaylists!(prev => prev.map((playlist) => {
                    if (playlist.id === currentPlaylist.id) {
                        return { ...playlist, songsId}
                    }
                    return playlist;
                }));
            }
        // };
    };

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <div>
            <IconButton
                onClick={openDialog}
            >
                <EditIcon className={classes.editButton} />
            </IconButton>

            <GenericDialog
                open={open}
                setOpen={setOpen}
                submitText={SUBMIT_BUTTON_TEXT}
                dialogTitle={DIALOG_TITLE}
                methods={methods}
                submitAction={actionEditPlaylist}
            >
                <div>
                    <GenericTextField
                        fieldTitle={NAME}
                        errorsMasssege={methods.formState.errors.name?.message}
                        fieldName={'name'}
                    />

                    <GenericAutocomplete
                        fieldTitle={SONGS}
                        errorsMasssege={methods.formState.errors.inputSongs?.message}
                        options={songs}
                        isMulitple={true}
                        fieldName={'inputSongs'}
                    />
                </div>
            </GenericDialog>
        </div>
    );
};

export default EditPlaylistDialog;