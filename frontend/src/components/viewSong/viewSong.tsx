import React, { useContext, useEffect, useState } from 'react';
import { Typography, Slider } from '@mui/material';

import useStyles from './viewSongStyle';
import { useAppSelector } from '../../redux/hooks';
import { durationFormat } from '../../functions/durationFormat';
import { AllSpoofyContext } from '../db/context';
import { useControlers } from './controlers/useControlers';
import Controlers from './controlers/controlers';

const ViewSong: React.FC = () => {
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const { moveForward } = useControlers({ isPlay, setIsPlay });
  const classes = useStyles();
  const currentSong = useAppSelector((state) => state.song.value);
  const { songs } = useContext(AllSpoofyContext);

  useEffect(() => {
    if (isPlay) {
      const interval = setInterval(() => {
        setCurrentSeconds((currentSeconds) => currentSeconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlay]);

  useEffect(() => {
    if (currentSeconds === currentSong!.duration) {
      if (songs.indexOf(currentSong!) === songs.length - 1) {
        setIsPlay(false);
      } else {
        moveForward();
      }
    }
  }, [currentSeconds]);

  useEffect(() => {
    setCurrentSeconds(0);
  }, [currentSong]);

  return (
    <div className={classes.body}>
      <div className={classes.appPart}>
        <Controlers isPlay={isPlay} setIsPlay={setIsPlay} />

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
          onChange={(_, value) => {
            setCurrentSeconds(Number(value));
          }}
          size="small"
          defaultValue={currentSong!.duration}
          aria-label="small"
          valueLabelDisplay="auto"
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
