import React from 'react';
import { ListItemButton, Typography } from '@mui/material';

import useStyles from './sideBarStyle';
import spoofyLogo from '../../pictures/spoofyLogo.png';
import Mode from '../../types/mode';
import { changeCurrentModeByValue } from '../../redux/ModeSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const LOGO_TEXT = 'spoofy';

const SideBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentMode = useAppSelector((state: { mode: { value: Mode } }) => state.mode.value);
    const classes = useStyles();

    const changeCurrentMode = (selectedMode: Mode) => {
        dispatch(changeCurrentModeByValue(selectedMode));
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
                {Object.entries(Mode).map((mode) => (
                    <ListItemButton
                        key={mode[0]}
                        id={mode[0]}
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
