import React from 'react';
import { ListItemButton, Typography } from '@mui/material';

import useStyles from './sideBarStyle';
import spoofyLogo from '../../pictures/spoofyLogo.png';
import { routeMapper } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { resetCurrentSong } from '../../redux/SongSlice';

const LOGO_TEXT = 'spoofy';

interface Mode {
  text: string;
  path: routeMapper;
}

const modes: Mode[] = [
  { text: 'שירים', path: routeMapper.SONG },
  { text: 'פלייליסטים', path: routeMapper.PLAYLIST },
  { text: 'מועדפים', path: routeMapper.FAVORITE },
  { text: 'מיקום', path: routeMapper.LOCATION },
];

const SideBar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeRoute = (selectedPath: string) => {
    dispatch(resetCurrentSong());
    if (window.location.pathname === selectedPath) {
      navigate(routeMapper.MAIN_PAGE);
    } else {
      navigate(selectedPath);
    }
  };

  return (
    <div>
      <div className={classes.logo}>
        <img className={classes.spoofyPic} src={spoofyLogo} />

        <Typography className={classes.spoofyText}>{LOGO_TEXT}</Typography>
      </div>

      <div className={classes.sideBar}>
        {modes.map((mode) => (
          <ListItemButton
            key={mode.text}
            selected={window.location.pathname === mode.path}
            onClick={() => changeRoute(mode.path)}
            className={classes.optionButton}
          >
            {mode.text}
          </ListItemButton>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
