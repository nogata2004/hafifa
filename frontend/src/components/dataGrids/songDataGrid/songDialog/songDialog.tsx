import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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
// import { ADD_SONG_SUB } from '../../db/songs/subscription';


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
    const [nameInput, setNameInput] = React.useState<string>('');
    const [artistInput, setArtistInput] = React.useState<string | null | string[]>(null);
    const [durationInput, setDurationInput] = React.useState<string>('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [mutationCreateSong] = useMutation(CREATE_SONG);
    const { setSongs } = useContext(AllSongsContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(songsSchema)
    });

    useQuery(GET_ALL_ARTISTS, {
        onCompleted: (data: { allArtists: { nodes: Artist[] } }) => {
            const inputArtists: Artist[] = data.allArtists.nodes;
            setArtists(inputArtists);
        }
    });

    const changeDurationInput = () => {
        const durationMinutes: number = Number(durationInput.split(':')[0]);
        const durationSeconds: number = Number(durationInput.split(':')[1]);
        return durationMinutes * 60 + durationSeconds;
    };

    const addSong = () => {
        mutationCreateSong({
            variables: {
                name: nameInput,
                artistId: artists.find(artist => (artist.name === artistInput))?.id,
                duration: changeDurationInput()
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
            }
        })
    };

    // useSubscription(ADD_SONG_SUB, {
    //     onSubscriptionData(data) {
    //         console.log(data)
    //     }
    // },
    // )

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
                submitAction={addSong}
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
                        setInput={setArtistInput}
                        fieldTitle={ARTIST}
                        register={register}
                        errorsMasssege={errors.artistName?.message}
                        options={artists.map((artist) => { return artist.name })}
                        isMulitple={false}
                        fieldName={'artistName'}
                    />

                    <GenericTextField
                        currentInput={durationInput}
                        setCurretnInput={setDurationInput}
                        fieldTitle={DURATION}
                        register={register}
                        errorsMasssege={errors.duration?.message}
                        fieldName={'duration'}
                    />
                </div>
            </GenericDialog>
        </div>
    );
};

export default SongDialog;