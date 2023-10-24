import React, { useContext, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import useStyles from './playlistDataGridStyle';
import GenericDialog from '../../../commons/genericDialog/genericDialog';
import { GET_PLAYLISTS_BY_USER } from '../../db/playlists/query';
import Playlist from '../../../types/playlist';
import { useAppSelector } from '../../../redux/hooks';
import User from '../../../types/user';
import ViewPlaylist from './viewPlaylist/viewPlaylist';
import { CREATE_PLAYLIST } from '../../db/playlists/mutation';
import GenericTextField from '../../../commons/genericTextField/genericTextField';
import { AllPlaylistsContext, AllSongsContext } from '../../db/context';
import GenericAutocomplete from '../../../commons/genericAutocomplete/genericAutocomplete';
import { ADD_SONG_TO_PLAYLIST } from '../../db/playlistSong/mutation';


const NAME = 'שם';
const SONGS = 'שירים';

const TITLE_TEXT = 'רשימת פלייליסטים';
const BUTTON_TEXT = '+צור פלייליסט חדש';
const SUBMIT_BUTTON_TEXT = 'צור פלייליסט';
const DIALOG_TITLE = 'יצירת פלייליסט';

const REQUIRED_ERROR = 'שדה הכרחי';
const TYPE_NAME_ERROR = 'שדה הכרחי מורכב מאותיות בלבד';

const playlistsSchema = yup.object({
    name: yup.string().matches(/^[a-z, א-ת]+$/, TYPE_NAME_ERROR).required(REQUIRED_ERROR),
    songsName: yup.string()
    // .required(REQUIRED_ERROR),
});

const PlaylistDataGrid: React.FC = () => {
    const classes = useStyles();
    const currentUser = useAppSelector((state: { user: { value: User | undefined }; }) => state.user.value);
    const [open, setOpen] = React.useState<boolean>(false);
    const [mutationCreatePlaylist] = useMutation(CREATE_PLAYLIST);
    const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const [nameInput, setNameInput] = React.useState<string>('');
    const [songsInput, setSongsInput] = React.useState<string | string[] | null>([]);
    const { songs } = useContext(AllSongsContext);
    const { playlists, setPlaylists } = useContext(AllPlaylistsContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(playlistsSchema),
        defaultValues: {
            name: '',
            songsName: ''
        }
    });

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
        <div className={classes.body}>
            <Typography className={classes.title}>
                {TITLE_TEXT}
            </Typography>

            <div className={classes.tables}>
                {playlists.map((playlist) => (
                    <div key={playlist.id}>
                        <ViewPlaylist
                            currentPlaylist={playlist}
                            handleSubmit={handleSubmit}
                            reset={reset}
                            register={register}
                            errors={errors}
                        />
                    </div>
                ))}
            </div>

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

export default PlaylistDataGrid;

