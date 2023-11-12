import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorderRounded } from '@mui/icons-material';
import { useMutation } from '@apollo/client';

import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
} from '../../../components/db/favorites/mutation';
import { useAppSelector } from '../../../redux/hooks';
import useStyles from './favoriteButtonStyle';
import { AllSpoofyContext } from '../../../components/db/context';

interface Props {
  isFavorite: boolean;
  songId: string;
}

const FavoriteButton: React.FC<Props> = ({ isFavorite, songId }) => {
  const classes = useStyles();
  const currentUser = useAppSelector((state) => state.user.value); // state typing
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [deleteFavorite] = useMutation(DELETE_FAVORITE);
  const { setSongs } = useContext(AllSpoofyContext);

  //custom hoko
  const removeFavorite = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    deleteFavorite({
      variables: {
        userId: currentUser?.id,
        songId: songId,
      },
      onCompleted() {
        setSongs((prev) =>
          prev.map((song) => {
            if (song.id === songId) {
              return { ...song, isFavorite: false };
            }
            return song;
          })
        );
      },
    });
  };

  const addToFavorite = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    addFavorite({
      variables: {
        userId: currentUser?.id,
        songId: songId,
      },
      onCompleted() {
        setSongs((prev) =>
          prev.map((song) => {
            if (song.id === songId) {
              return { ...song, isFavorite: true };
            }
            return song;
          })
        );
      },
    });
  };

  return (
    <div>
      <IconButton
        onClick={(event) => {
          isFavorite ? removeFavorite(event) : addToFavorite(event);
        }}
        className={classes.tableButton}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorderRounded />}
      </IconButton>
    </div>
  );
};

export default FavoriteButton;
