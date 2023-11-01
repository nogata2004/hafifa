import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';

import useStyles from './playlistDialogStyle';
import GenericDialog from '../../../../commons/genericDialog/genericDialog';
import Playlist from '../../../../types/playlist';
import { useAppSelector } from '../../../../redux/hooks';
import User from '../../../../types/user';
import { CREATE_PLAYLIST } from '../../../db/playlists/mutation';
import GenericTextField from '../../../../commons/genericTextField/genericTextField';
import { AllPlaylistsContext, AllSongsContext } from '../../../db/context';
import GenericAutocomplete from '../../../../commons/genericAutocomplete/genericAutocomplete';
import { ADD_SONG_TO_PLAYLIST } from '../../../db/playlistSong/mutation';


const NAME = 'שם';
const SONGS = 'שירים';
const BUTTON_TEXT = '+צור פלייליסט חדש';
const SUBMIT_BUTTON_TEXT = 'צור פלייליסט';
const DIALOG_TITLE = 'יצירת פלייליסט';

interface Props {
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    reset: UseFormReset<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>
};

const PlaylistDialog: React.FC<Props> = ({handleSubmit, reset, register, errors }) => {
    const classes = useStyles();
    const currentUser = useAppSelector((state: { user: { value: User | undefined } }) => state.user.value);
    const [open, setOpen] = React.useState<boolean>(false);
    const [mutationCreatePlaylist] = useMutation(CREATE_PLAYLIST);
    const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const [nameInput, setNameInput] = React.useState<string>('');
    const [songsInput, setSongsInput] = React.useState<string | string[] | null>([]);
    const { songs } = useContext(AllSongsContext);
    const { setPlaylists } = useContext(AllPlaylistsContext);

    const actionAddPlaylist = () => {
        mutationCreatePlaylist({
            variables: {
                name: nameInput,
                userId: currentUser!.id
            },
            onCompleted(data) {
                const dataPlaylist = data.createPlaylist.playlist;
                const newPlaylist: Playlist = {
                    id: dataPlaylist.id,
                    name: dataPlaylist.name,
                    songsID: []
                };
                setPlaylists!(prev => [...prev, newPlaylist]);

                if (typeof (songsInput) != 'string') {
                    songsInput?.map((songName: string) => {
                        mutationAddSongToPlaylist({
                            variables: {
                                playlistId: dataPlaylist.id,
                                songId: songs.find(song => (song.name === songName))?.id,
                            },
                            onCompleted(data) {
                                const dataPlaylistSong = data.createPlaylistSong.playlistSong;
                                setPlaylists!(prev => prev.map((playlist) => {
                                    if (playlist.id === dataPlaylist.id) {
                                        playlist.songsID.push(dataPlaylistSong.songId);
                                        return playlist;
                                    }
                                    return playlist;
                                }));
                            }
                        })
                    })
                }
            }
        });
    };


    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                className={classes.openDialog}
            >
                {BUTTON_TEXT}
            </Button>

            <GenericDialog
                open={open}
                setOpen={setOpen}
                submitText={SUBMIT_BUTTON_TEXT}
                dialogTitle={DIALOG_TITLE}
                handleSubmit={handleSubmit}
                reset={reset}
                submitAction={actionAddPlaylist}
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

export default PlaylistDialog;
