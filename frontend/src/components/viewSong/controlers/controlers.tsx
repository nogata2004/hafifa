import React, { useContext } from 'react';
import { Button } from '@mui/material';

import useStyles from './controlersStyle';
import { useAppSelector } from '../../../redux/hooks';
import slideLeft from '../../../pictures/slideLeft.png';
import slideRight from '../../../pictures/slideRight.png';
import stopButton from '../../../pictures/stopButton.png';
import playButton from '../../../pictures/playButton.png';
import { AllSpoofyContext } from '../../db/context';
import { useControlers } from './useControlers';

interface Props {
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controlers: React.FC<Props> = ({ isPlay, setIsPlay }) => {
  const { moveForward, moveBack, startStopSong } = useControlers({
    isPlay,
    setIsPlay,
  });
  const classes = useStyles();
  const currentSong = useAppSelector((state) => state.song.value);
  const currentSongsList = useAppSelector((state) => state.song.songsList);
  const { songs } = useContext(AllSpoofyContext);

  return (
    <div className={classes.controls}>
      <Button
        onClick={moveBack}
        disabled={currentSongsList!.indexOf(currentSong!) === 0}
      >
        <img className={classes.slidesStopButtons} src={slideLeft} />
      </Button>

      <Button onClick={startStopSong}>
        <img
          className={classes.slidesStopButtons}
          src={isPlay ? stopButton : playButton}
        />
      </Button>

      <Button
        onClick={moveForward}
        disabled={
          currentSongsList.indexOf(currentSong!) === currentSongsList.length - 1
        }
      >
        <img className={classes.slidesStopButtons} src={slideRight} />
      </Button>
    </div>
  );
};

export default Controlers;
