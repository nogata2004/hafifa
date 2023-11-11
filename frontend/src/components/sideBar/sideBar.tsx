import React from 'react';
import { ListItemButton, Typography } from '@mui/material';

import useStyles from './sideBarStyle';
import spoofyLogo from '../../pictures/spoofyLogo.png';
import Mode from '../../types/mode';
import { MAIN_PAGE_LABEL, routesMapper } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { resetCurrentSong } from '../../redux/SongSlice';

const LOGO_TEXT = 'spoofy';

const SideBar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeRoute = (selectedMode: Mode) => {
    dispatch(resetCurrentSong());
    if (window.location.pathname === routesMapper[selectedMode]) {
      navigate(routesMapper[MAIN_PAGE_LABEL]);
    } else {
      navigate(routesMapper[selectedMode]);
    }
  };

  return (
    <div>
      <div className={classes.logo}>
        <img className={classes.spoofyPic} src={spoofyLogo} />

        <Typography className={classes.spoofyText}>{LOGO_TEXT}</Typography>
      </div>

      <div className={classes.sideBar}>
        {Object.values(Mode).map(
          (
            mode
          ) => (
            <ListItemButton
              key={mode}
              // id={mode} // unneeded todo
              selected={window.location.pathname === routesMapper[mode]}
              onClick={() => changeRoute(mode)}
              className={classes.optionButton}
            >
              {mode}
            </ListItemButton>
          )
        )}
      </div>
    </div>
  );
};

export default SideBar;
