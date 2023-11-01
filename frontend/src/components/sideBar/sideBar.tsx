import React from 'react';
import { ListItemButton, Typography } from '@mui/material';

import useStyles from './sideBarStyle';
import spoofyLogo from '../../pictures/spoofyLogo.png';
import Mode from '../../types/mode';

const LOGO_TEXT = 'spoofy';

interface Props {
    currentMode: Mode;
    setCurrentMode: React.Dispatch<React.SetStateAction<Mode>>;
};

const SideBar: React.FC<Props> = ({ currentMode, setCurrentMode }) => {
    const classes = useStyles();

    const changeCurrentMode = (selectedMode: Mode) => {
        if (currentMode === selectedMode) {
            setCurrentMode(Mode.none) // replace with undefined
        } else {
            setCurrentMode(selectedMode);
        }
    };

    return (
        <div>
            <div className={classes.logo}>
                <img
                    className={classes.spoofyPic}
                    src={spoofyLogo}
                />

                <Typography className={classes.spoofyText}>
                    {LOGO_TEXT}
                </Typography>
            </div>

            <div className={classes.sideBar}>
                {Object.entries(Mode).filter((mode) => mode[1] !== Mode.none).map((mode) => ( // remove filter after chaning modes enum
                    <ListItemButton
                        key={mode[0]} // remove usage of key. also remove object entries, and remove filter
                        id={mode[0]} // remove usage of key
                        selected={currentMode === mode[1]}
                        onClick={() => changeCurrentMode(mode[1])}
                        className={classes.optionButton}
                    >
                        {mode[1]}
                    </ListItemButton>
                )
                )}
            </div>
        </div>
    );
};

export default SideBar;
