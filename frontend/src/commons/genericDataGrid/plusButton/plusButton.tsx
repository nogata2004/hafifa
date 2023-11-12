import React, { useContext, useState } from 'react';
import { IconButton, Popover, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import useStyles from './PlusButtonStyle';
import { AllSpoofyContext } from '../../../components/db/context';
import PlaylistItem from './playlistItem/playlistItem';

const ADD_PLAYLIST_TITLE = 'הוסף לפלייליסט';
const SONG_TEXT = 'השיר';
const ERROR_TEXT = 'כבר נמצא בפלייליסט זה';
const COMPLETE_TEXT = 'נוסף בהצלחה';

interface Props {
  songId: string;
  songName: string;
}

export enum PlaylistMode {
  NOT_CHOSEN = 'white',
  EXIST = 'red',
  NOT_EXIST = 'green',
}

const PlusButton: React.FC<Props> = ({ songId, songName }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { playlists } = useContext(AllSpoofyContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null); // anchorEl use with ref todo
  const [currentPlaylistMode, setCurrentPlaylistMode] = useState<PlaylistMode>(
    PlaylistMode.NOT_CHOSEN
  );
  // ); // rename done // change type frmo bool to enum - done
  const classes = useStyles({ currentPlaylistMode });

  const PlaylistModeMapper = {
    [PlaylistMode.NOT_CHOSEN]: '',
    [PlaylistMode.EXIST]: `${SONG_TEXT} ${songName} ${ERROR_TEXT}`,
    [PlaylistMode.NOT_EXIST]: `${SONG_TEXT} ${songName} ${COMPLETE_TEXT}`,
  };

  const clickPlus = (event: React.MouseEvent<HTMLButtonElement>) => {
    // rename clickPlus done
    event.stopPropagation();
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPlaylistMode(PlaylistMode.NOT_CHOSEN);
  };

  return (
    <div>
      <IconButton onClick={clickPlus} className={classes.tableButton}>
        <Add />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        className={classes.popover}
      >
        <Typography // create popper content todo
          className={classes.popoverTitle}
        >
          {ADD_PLAYLIST_TITLE}
        </Typography>

        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <PlaylistItem
              songId={songId}
              currentPlaylist={playlist}
              setCurrentPlaylistMode={setCurrentPlaylistMode}
            />
          </div>
        ))}

        <Typography className={classes.addedMassege}>
          {PlaylistModeMapper[currentPlaylistMode]}
          {/* mapper done */}
        </Typography>
      </Popover>
    </div>
  );
};

export default PlusButton;
