import { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';

import { AllSpoofyContext } from '../../../db/context';
import { GET_ALL_ARTISTS } from '../../../db/artists/query';
import { CREATE_SONG } from '../../../db/songs/mutation';
import Song from '../../../../types/song';
import { songDialogValidationSchema } from './validationSchema';
import { DBSong } from '../../../../types/dbSong';
import Artist from '../../../../types/artist';

interface Props {
  setArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum DialogKeys {
  NAME = 'name',
  ARTIST = 'artist',
  DURATION = 'duration',
}

export const useSongDialog = (props: Props) => {
  const { setArtists, setOpen } = props;
  const [createSong] = useMutation(CREATE_SONG);
  const { setSongs } = useContext(AllSpoofyContext);

  const defaultValues = {
    [DialogKeys.NAME]: '',
    [DialogKeys.ARTIST]: null,
    [DialogKeys.DURATION]: '',
  };

  const methods = useForm({
    resolver: yupResolver(songDialogValidationSchema),
    defaultValues: defaultValues,
  });

  useQuery(GET_ALL_ARTISTS, {
    onCompleted: (data: { allArtists: { nodes: Artist[] } }) => {
      const inputArtists: Artist[] = data.allArtists.nodes;
      setArtists(inputArtists);
    },
  });

  const changeDurationInput = (durationInput: string) => {
    const minutesAndSeconds: String[] = durationInput.split(':');
    return Number(minutesAndSeconds[0]) * 60 + Number(minutesAndSeconds[1]);
  };

  const addSong = (data: FieldValues) => {
    createSong({
      variables: {
        name: data.name,
        artistId: data.artist.id,
        duration: changeDurationInput(data.duration),
      },
      onCompleted(data) {
        const dataSong: DBSong = data.createSong.song;
        const newSong: Song = {
          id: dataSong.id,
          name: dataSong.name,
          duration: dataSong.duration,
          artist: {
            id: dataSong.artistByArtistId.id,
            name: dataSong.artistByArtistId.name,
          },
          isFavorite: false,
        };
        setSongs((prev) => [...prev, newSong]);
        setOpen(false);
        methods.reset();
      },
    });
  };

  return { methods, addSong };
};
