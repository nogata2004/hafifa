import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AllSpoofyContext } from "../../db/context";
import { changeCurrentSongByValue } from "../../../redux/SongSlice";
import Song from "../../../types/song";


interface Props {
    isPlay: boolean;
    setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useControlers = (props: Props) => {
    const {isPlay, setIsPlay} = props;
    const currentSong = useAppSelector((state) => state.song.value);
    const dispatch = useAppDispatch();
    const { songs } = useContext(AllSpoofyContext);

    const startStopSong = () => {
        isPlay ? setIsPlay(false) : setIsPlay(true);
    };

    const moveForward = () => {  
        const currentSongIndex = songs.indexOf(currentSong!);
        const nextSong: Song = songs[currentSongIndex + 1];
        dispatch(changeCurrentSongByValue(nextSong));
    };

    const moveBack = () => {
        const currentSongIndex = songs.indexOf(currentSong!);
        const nextSong: Song = songs[currentSongIndex - 1];
        dispatch(changeCurrentSongByValue(nextSong));
    };

    return { moveForward, moveBack, startStopSong };
};
