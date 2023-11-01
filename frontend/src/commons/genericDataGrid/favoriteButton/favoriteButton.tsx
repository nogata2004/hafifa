import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorderRounded } from '@mui/icons-material';
import { useMutation } from '@apollo/client';

import { ADD_FAVORITE, DELETE_FAVORITE } from '../../../components/db/favorites/mutation';
import { useAppSelector } from '../../../redux/hooks';
import useStyles from './favoriteButtonStyle';
import { AllSongsContext } from '../../../components/db/context';


interface Props {
    isFavorite: boolean;
    songId: string;
};

const FavoriteButton: React.FC<Props> = ({ isFavorite, songId }) => {
    const classes = useStyles();
    const currentUser = useAppSelector((state: { user: { value: any; }; }) => state.user.value); // state typing
    const [mutationAddFavorite] = useMutation(ADD_FAVORITE);
    const [mutationDeleteFavorite] = useMutation(DELETE_FAVORITE);
    const { setSongs } = useContext(AllSongsContext);

    //custom hoko
    const removeFavorite = (event: { stopPropagation: () => void; }) => {
        event.stopPropagation();
        mutationDeleteFavorite({
            variables: {
                userId: currentUser?.id,
                songId: songId
            },
            onCompleted() {
                setSongs!(prev => prev.map((song) => {
                    if (song.id === songId) {
                        return { ...song, isFavorite: false }
                    }
                    return song;
                }));
            }
        })
    };

    const addFavorite = (event: { stopPropagation: () => void; }) => {
        event.stopPropagation();
        mutationAddFavorite({
            variables: {
                userId: currentUser?.id,
                songId: songId
            },
            onCompleted() {
                setSongs!(prev => prev.map((song) => {
                    if (song.id === songId) {
                        return { ...song, isFavorite: true }
                    }
                    return song
                }))
            }
        })
    };

    return (
        <div>
            <IconButton
                onClick={(event) => { isFavorite ? removeFavorite(event) : addFavorite(event) }}
                className={classes.tableButton}
            >
                {isFavorite ? <Favorite /> : <FavoriteBorderRounded />}
            </IconButton>
        </div >
    );
};

export default FavoriteButton;