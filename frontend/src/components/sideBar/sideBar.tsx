import React from 'react';
import { ListItemButton, Typography } from '@mui/material';

import useStyles from './sideBarStyle';
import spoofyLogo from '../../pictures/spoofyLogo.png';
import Mode from '../../types/mode';
import { MAIN_PAGE_LABEL, routesMapper } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';

const LOGO_TEXT = 'spoofy';

const SideBar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const changeRoute = (selectedMode: Mode) => {
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
            mode // remove filter after chaning modes enum - done
          ) => (
            <ListItemButton
              key={mode} // remove usage of key. also remove object entries, and remove filter - done
              id={mode} // remove usage of key - done
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
