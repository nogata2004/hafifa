import React, { useContext, useEffect } from 'react';
import { Typography, Button, Slider } from '@mui/material';

import useStyles from './viewSongStyle';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import slideLeft from '../../pictures/slideLeft.png';
import slideRight from '../../pictures/slideRight.png';
import stopButton from '../../pictures/stopButton.png';
import playButton from '../../pictures/playButton.png';
import durationFormat from '../../functions/dorationFormat';
import { changeCurrentSongByValue } from '../../redux/SongSlice';
import { AllSongsContext } from '../db/context';
import Song from '../../types/song';


const ViewSong: React.FC = () => {
    const [currentSeconds, setCurrentSeconds] = React.useState<number>(0);
    const [isPlay, setIsPlay] = React.useState<boolean>(true);
    const classes = useStyles();
    const currentSong = useAppSelector((state) => state.song.value);
    const dispatch = useAppDispatch();
    const { songs } = useContext(AllSongsContext);

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

    useEffect(() => {
        if (isPlay) {
            const interval = setInterval(() => {
                setCurrentSeconds(currentSeconds => currentSeconds + 1)
            }, 1000);
            return () => clearInterval(interval);
        };
    }, [isPlay]);

    useEffect(() => {
        currentSeconds === currentSong!.duration && moveForward();
    }, [currentSeconds]);

    useEffect(() => {
        setCurrentSeconds(0);
    }, [currentSong]);


    return (
        <div className={classes.body}>
            <div className={classes.appPart}>
                <div className={classes.controls}>
                    <Button
                        onClick={moveBack}
                        disabled={songs.indexOf((currentSong!)) === 0}
                    >
                        <img
                            className={classes.slidesStopButtons}
                            src={slideLeft}
                        />
                    </Button>

                    <Button
                        onClick={startStopSong}
                    >
                        <img
                            className={classes.slidesStopButtons}
                            src={isPlay ? stopButton : playButton}
                        />
                    </Button>

                    <Button
                        onClick={moveForward}
                        disabled={songs.indexOf((currentSong!)) === songs.length -1}
                    >
                        <img

                            className={classes.slidesStopButtons}
                            src={slideRight}
                        />
                    </Button>
                </div>

                <div className={classes.title}>
                    <Typography className={classes.userName}>
                        {currentSong?.artist.name}
                    </Typography>

                    <Typography className={classes.songName}>
                        {currentSong?.name}
                    </Typography>
                </div>
            </div>

            <div>
                <Slider
                    min={0}
                    max={currentSong!.duration}
                    value={currentSeconds}
                    size='small'
                    defaultValue={currentSong!.duration}
                    aria-label='small'
                    valueLabelDisplay='auto'
                    className={classes.line}
                />

                <div className={classes.time}>
                    <Typography className={classes.userName}>
                        {durationFormat(currentSeconds)}
                    </Typography>

                    <Typography className={classes.userName}>
                        {durationFormat(currentSong!.duration)}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default ViewSong;
