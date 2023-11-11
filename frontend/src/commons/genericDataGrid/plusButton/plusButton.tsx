import React, { useContext } from 'react';
import { IconButton, Popover, Typography } from '@mui/material';
import { Add, } from '@mui/icons-material';

import useStyles from './plusButtonStyle';
import { AllSpoofyContext } from '../../../components/db/context';
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
    const [open, setOpen] = React.useState<boolean>(false);
    const { playlists } = useContext(AllSpoofyContext);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null); // anchorEl use with ref todo
    const [includePlaylist, setIncludePlaylist] = React.useState<boolean | undefined>(undefined); // rename todo // change type frmo bool to enum
    const classes = useStyles(includePlaylist);

    const plusClicked = (event: React.MouseEvent<HTMLButtonElement>) => { // rename clickPlus todo
        event.stopPropagation();
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
        setIncludePlaylist(undefined);
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
                    className={classes.addedMassege}
                >
                    {includePlaylist === true // mapper todo
                        ? `${SONG_TEXT} ${songName} ${ERROR_TEXT}`
                        : includePlaylist === false &&
                         `${SONG_TEXT} ${songName} ${COMPLETE_TEXT}`
                    }
                </Typography>
            </Popover>
        </div >
    );
};

export default PlusButton;