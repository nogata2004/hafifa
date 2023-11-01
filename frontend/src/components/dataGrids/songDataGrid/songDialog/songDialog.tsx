import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@mui/material';

import GenericDialog from '../../../../commons/genericDialog/genericDialog';
import useStyles from '../../playlistDataGrid/playlistDialog/playlistDialogStyle';
import { AllSongsContext } from '../../../db/context';
import GenericTextField from '../../../../commons/genericTextField/genericTextField';
import GenericAutocomplete from '../../../../commons/genericAutocomplete/genericAutocomplete';
import Artist from '../../../../types/artist';
import { GET_ALL_ARTISTS } from '../../../db/artists/query';
import { CREATE_SONG } from '../../../db/songs/mutation';
import Song from '../../../../types/song';


const SUBMIT_BUTTON_TEXT = 'צור שיר';
const DIALOG_TITLE = 'יצירת שיר';
const BUTTON_TEXT = '+צור שיר';
const NAME = 'שם';
const ARTIST = 'זמר';
const DURATION = 'משך שיר';
const REQUIRED_ERROR = 'שדה הכרחי';
const TYPE_NAME_ERROR = 'שדה הכרחי מורכב מאותיות בלבד';
const TYPE_DURATION_ERROR = 'שדה הכרחי חייב להיות בפורמט: mm:ss';

const songsSchema = yup.object({
    name: yup.string().matches(/^[a-z, א-ת]+$/, TYPE_NAME_ERROR).required(REQUIRED_ERROR),
    artistName: yup.string().required(REQUIRED_ERROR),
    duration: yup.string().matches(/[0-5][0-9]:[0-5][0-9]/, TYPE_DURATION_ERROR).required(REQUIRED_ERROR)
});

const SongDialog: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [mutationCreateSong] = useMutation(CREATE_SONG);
    const { setSongs } = useContext(AllSongsContext);

    const defaultValues = {
        name: '',
        artistName: '',
        duration: ''
    };

    const methods = useForm({
        resolver: yupResolver(songsSchema),
        defaultValues: defaultValues
    });

    useQuery(GET_ALL_ARTISTS, {
        onCompleted: (data: { allArtists: { nodes: Artist[] } }) => {
            const inputArtists: Artist[] = data.allArtists.nodes;
            setArtists(inputArtists);
        }
    });

    const changeDurationInput = (durationInput: string) => {
        const durationMinutes: number = Number(durationInput.split(':')[0]);
        const durationSeconds: number = Number(durationInput.split(':')[1]);
        return durationMinutes * 60 + durationSeconds;
    };

    const addSong = (data: FieldValues) => {
        console.log(data)
        mutationCreateSong({
            variables: {
                name: data.name,
                artistId: artists.find(artist => (artist.name === data.artistName))?.id,
                duration: changeDurationInput(data.duration)
            },
            onCompleted(data) {
                const dataSong = data.createSong.song;
                const newSong: Song = {
                    id: dataSong.id,
                    name: dataSong.name,
                    duration: dataSong.duration,
                    artist: {
                        id: dataSong.artistByArtistId.id,
                        name: dataSong.artistByArtistId.name
                    },
                    isFavorite: false
                }
                setSongs!(prev => [...prev, newSong])
                setOpen(false);
            }
        })
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
                submitAction={addSong}
            >
                <div>
                    <GenericTextField
                        fieldTitle={NAME}
                        errorsMasssege={methods.formState.errors.name?.message}
                        fieldName={'name'}
                    />

                    <GenericAutocomplete
                        fieldTitle={ARTIST}
                        errorsMasssege={methods.formState.errors.artistName?.message}
                        options={artists.map((artist) => { return artist.name })}
                        isMulitple={false}
                        fieldName={'artistName'}
                    />

                    <GenericTextField
                        fieldTitle={DURATION}
                        errorsMasssege={methods.formState.errors.duration?.message}
                        fieldName={'duration'}
                    />
                </div>
            </GenericDialog>
        </div>
    );
};

export default SongDialog;