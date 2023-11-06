import { useContext } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';

import { AllSpoofyContext } from '../../../db/context';
import { GET_ALL_ARTISTS } from '../../../db/artists/query';
import { CREATE_SONG } from '../../../db/songs/mutation';
import Song from '../../../../types/song';
import { songDialogValidationSchema } from './songSchema';
import { DBSong } from '../../../../types/dbSong';
import Artist from "../../../../types/artist";

interface Props {
    setArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSongDialog = (props: Props) => {
    const {setArtists, setOpen} = props;
    const [mutationCreateSong] = useMutation(CREATE_SONG);
    const { setSongs } = useContext(AllSpoofyContext);

    const defaultValues = {
        name: '',
        artist: null,
        duration: '',
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
        // check if u can get a better type // there are datetime fns to translate time - to do
        const minutesAndSeconds: String[] = durationInput.split(':');
        return Number(minutesAndSeconds[0]) * 60 + Number(minutesAndSeconds[1]);
      };
    
      const addSong = (data: FieldValues) => {
        mutationCreateSong({
          variables: {
            name: data.name,
            artistId: data.artist.id,
            duration: changeDurationInput(data.duration),
          },
          onCompleted(data) {
            const dataSong: DBSong = data.createSong.song; // typing haser - done
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
    

    return { defaultValues, methods, addSong };
};
