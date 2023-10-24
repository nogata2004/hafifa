import React, { useContext } from 'react';
import { IconButton, Popover, Typography } from '@mui/material';
import { Add, } from '@mui/icons-material';

import useStyles from './plusButtonStyle';
import { AllPlaylistsContext } from '../../../components/db/context';
import PlaylistItem from './playlistItem/playlistItem';


const ADD_PLAYLIST_TITLE = 'הוסף לפלייליסט';
const SONG_TEXT = 'השיר';
const ERROR_TEXT = 'כבר נמצא בפלייליסט זה';
const COMPLETE_TEXT = 'נוסף בהצלחה';

interface Props {
    songId: string;
    songName: string;
};

const PlusButton: React.FC<Props> = ({ songId, songName }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const { playlists } = useContext(AllPlaylistsContext);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [includePlaylist, setIncludePlaylist] = React.useState<boolean | null>(null);

    const plusClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
        setIncludePlaylist(null);
    };

    return (
        <div>
            <IconButton
                onClick={plusClicked}
                className={classes.tableButton}
            >
                <Add />
            </IconButton>

            <Popover
                open={open}
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                aria-describedby="alert-dialog-new-song"
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                className={includePlaylist ?
                    classes.popoverTrue :
                    includePlaylist === false ?
                        classes.popoverFalse :
                        classes.popover
                }
            >
                <Typography
                    className={classes.popoverTitle}
                >
                    {ADD_PLAYLIST_TITLE}
                </Typography>

                {playlists.map((playlist) => (
                    <div
                        key={playlist.id}
                    >
                        <PlaylistItem
                            songId={songId}
                            currentPlaylist={playlist}
                            setIncludePlaylist={setIncludePlaylist}
                        />
                    </div>
                ))}

                <Typography
                    // className={classes.popoverTitle}
                >
                    {includePlaylist
                        ?
                        `${SONG_TEXT} ${songName} ${ERROR_TEXT}`
                        :
                        includePlaylist === false &&
                        `${SONG_TEXT} ${songName} ${COMPLETE_TEXT}`
                    }
                </Typography>
            </Popover>
        </div >
    );
};

export default PlusButton;