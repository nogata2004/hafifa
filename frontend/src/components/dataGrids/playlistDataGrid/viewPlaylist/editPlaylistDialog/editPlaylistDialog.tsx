import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';
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

const NAME = 'שם';
const SONGS = 'שירים';
const SUBMIT_BUTTON_TEXT = 'שמור';
const DIALOG_TITLE = 'עריכת פלייליסט';

interface Props {
    currentPlaylist: Playlist;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    reset: UseFormReset<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
};

const EditPlaylistDialog: React.FC<Props> = ({ currentPlaylist, handleSubmit, reset, register, errors }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const [mutationEditPlaylist] = useMutation(EDIT_PLAYLIST);
    const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const [mutationDeleteSongPlaylist] = useMutation(DELETE_PLAYLIST_SONG);
    const [nameInput, setNameInput] = React.useState<string>('');
    const [songsInput, setSongsInput] = React.useState<string[] | string | null>([]);
    const { songs } = useContext(AllSongsContext);
    const { setPlaylists } = useContext(AllPlaylistsContext);

    const actionEditPlaylist = () => {
        if (currentPlaylist.name !== nameInput) {
            mutationEditPlaylist({
                variables: {
                    id: currentPlaylist.id,
                    name: nameInput
                },
                onCompleted() {
                    setPlaylists!(prev => prev.map((playlist) => {
                        if (playlist.id === currentPlaylist.id) {
                            return { ...playlist, name: nameInput }
                        }
                        return playlist;
                    }));
                }
            })
        };

        if (typeof (songsInput) != 'string' && songsInput !== null) {
            if (currentPlaylist.songsID !== songsInput) {
                const songsId: string[] = songsInput.map((songName) => {
                    return songs.find(song => (song.name === songName))!.id
                });

                songsId.map((songId) => {
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
                        return { ...playlist, songsID: songsId }
                    }
                    return playlist;
                }));
            }
        };
    };

    const IdToName = (songsId: string[]) => {
        return songsId.map((songId) => {
            return songs.find((song) => { song.id === songId })!.name
        });
    };

    const openDialog = () => {
        setOpen(true);
        setNameInput(currentPlaylist.name)
        setSongsInput(IdToName(currentPlaylist.songsID))
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
                handleSubmit={handleSubmit}
                reset={reset}
                submitAction={actionEditPlaylist}
            >
                <div>
                    <GenericTextField
                        currentInput={nameInput}
                        setCurretnInput={setNameInput}
                        fieldTitle={NAME}
                        register={register}
                        errorsMasssege={errors.name?.message}
                        fieldName={'name'}
                    />

                    <GenericAutocomplete
                        setInput={setSongsInput}
                        fieldTitle={SONGS}
                        register={register}
                        errorsMasssege={errors.songsName?.message}
                        options={songs.map((song) => { return song.name })}
                        isMulitple={true}
                        fieldName={'songsName'}
                    />
                </div>
            </GenericDialog>
        </div>
    );
};

export default EditPlaylistDialog;