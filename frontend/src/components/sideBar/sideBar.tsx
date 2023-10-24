import React from 'react';
import { Button, Typography } from '@mui/material';

import useStyles from './sideBarStyle';
import spoofyLogo from '../../pictures/spoofyLogo.png';
import Mode from '../../types/mode';
import { changeCurrentModeByValue } from '../../redux/ModeSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const LOGO_TEXT = 'spoofy';

const SideBar: React.FC = () => {
    const [selectedMode, setSelectedMode] = React.useState<Mode>(Mode.song);
    const dispatch = useAppDispatch();
    const currentMode = useAppSelector((state: { mode: { value: Mode }; }) => state.mode.value);
    const classes = useStyles({ currentMode, selectedMode });

    const changeCurrentMode = (selectedMode: Mode) => {
        dispatch(changeCurrentModeByValue(selectedMode));
        setSelectedMode(selectedMode);
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
                    <Button
                        key={mode[0]}
                        id={mode[0]}
                        onClick={() => changeCurrentMode(mode[1])}
                        className={currentMode === mode[1] ? classes.chosenOptionButton : classes.optionsButton}>
                        {mode[1]}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
