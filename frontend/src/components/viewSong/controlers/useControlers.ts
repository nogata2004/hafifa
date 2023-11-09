import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { changeCurrentSongByValue } from '../../../redux/SongSlice';
import Song from '../../../types/song';

interface Props {
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useControlers = (props: Props) => {
  const { isPlay, setIsPlay } = props;
  const currentSong = useAppSelector((state) => state.song.value);
  const currentSongsList = useAppSelector((state) => state.song.songsList);
  const dispatch = useAppDispatch();

  const startStopSong = () => {
    isPlay ? setIsPlay(false) : setIsPlay(true);
  };

  const moveForward = () => {
    const currentSongIndex = currentSongsList!.indexOf(currentSong!);
    const nextSong: Song = currentSongsList![currentSongIndex + 1];
    dispatch(changeCurrentSongByValue(nextSong));
  };

  const moveBack = () => {
    const currentSongIndex = currentSongsList!.indexOf(currentSong!);
    const nextSong: Song = currentSongsList![currentSongIndex - 1];
    dispatch(changeCurrentSongByValue(nextSong));
  };

  return { moveForward, moveBack, startStopSong };
};
