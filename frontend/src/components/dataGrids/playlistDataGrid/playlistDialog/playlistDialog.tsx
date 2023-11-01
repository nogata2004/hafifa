import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import useStyles from './playlistDialogStyle';
import GenericDialog from '../../../../commons/genericDialog/genericDialog';
import Playlist from '../../../../types/playlist';
import { useAppSelector } from '../../../../redux/hooks';
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
    methods: UseFormReturn<any, any, undefined>;
};

const PlaylistDialog: React.FC<Props> = ({ methods }) => {
    const classes = useStyles();
    const currentUser = useAppSelector((state) => state.user.value);

    const [open, setOpen] = React.useState<boolean>(false);
    const [mutationCreatePlaylist] = useMutation(CREATE_PLAYLIST);
    const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const { songs } = useContext(AllSongsContext);
    const { setPlaylists } = useContext(AllPlaylistsContext);

    const actionAddPlaylist = (data: FieldValues) => {
        mutationCreatePlaylist({
            variables: {
                name: data.name,
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

                if (typeof (data.songs) != 'string') {
                    data.inputSongs.map((songName: string) => {
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
                methods={methods}
                submitAction={actionAddPlaylist}
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

export default PlaylistDialog;