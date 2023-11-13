import React from 'react';
import { Typography } from '@mui/material';
import useStyles from './playlistDataGrid/playlistDataGridStyle';
import { RouteMapper } from '../../routes/routes';

const TITLE = 'רשימת שירים';

interface Props {
  children: JSX.Element;
}

const DataGrids: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  const titleMap = {
    [RouteMapper.SONG]: 'רשימת שירים',
    [RouteMapper.PLAYLIST]: 'רשימת פלייליסטים',
    [RouteMapper.FAVORITE]: 'רשימת מועדפים',
    [RouteMapper.LOCATION]: 'מיקום',
  };

  const currentPath: RouteMapper = Object.values(RouteMapper).find(
    (route) => route === window.location.pathname
  )!;

  return (
    <div className={classes.body}>
      <Typography className={classes.title}>
        {titleMap[currentPath]}
        {/* todo  */}
      </Typography>

      {children}
    </div>
  );
};

export default DataGrids;
