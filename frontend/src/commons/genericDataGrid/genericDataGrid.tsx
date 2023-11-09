import React, { useContext } from 'react';
import {
  DataGridPro,
  GridColDef,
  GridRowParams,
  LicenseInfo,
} from '@mui/x-data-grid-pro';

import useStyles from './genericDataGridStyle';
import Song from '../../types/song';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  changeCurrentSongByValue,
  changeCurrentSongsList,
  resetCurrentSong,
} from '../../redux/SongSlice';
import FavoriteButton from './favoriteButton/favoriteButton';
import { AllSpoofyContext } from '../../components/db/context';
import PlusButton from './plusButton/plusButton';
import { useGenericDataGrid } from './useGenericDataGrid';

interface Props {
  filterSongs: Song[];
}

const GenericDataTable: React.FC<Props> = ({ filterSongs }) => {
  const classes = useStyles();
  const currentSong = useAppSelector((state) => state.song.value);
  const dispatch = useAppDispatch();
  const { songs } = useContext(AllSpoofyContext);
  const { rows } = useGenericDataGrid({ classes, filterSongs });

  LicenseInfo.setLicenseKey(
    '6239d8e4e4e446a3d208d638ff7603bdT1JERVI6Um9tLVRlc3QsRVhQSVJZPTIyMjMwNjEyMDAwMDAsS0VZVkVSU0lPTj0x'
  );

  const changeCurrentSong = (params: GridRowParams) => {
    if (currentSong?.id === params.row.id) {
      dispatch(resetCurrentSong());
    } else {
      const selectedSong: Song = songs.find((song) => song.id === params.id)!;
      dispatch(changeCurrentSongByValue(selectedSong));
      dispatch(changeCurrentSongsList(filterSongs));
    }
  };

  // make customhook useTable that returns column and rows - to do column
  const columns: GridColDef[] = [
    {
      field: 'name',
      width: 350,
      headerName: 'שיר',
      headerClassName: classes.header,
      editable: false,
    },
    {
      field: 'artist',
      width: 270,
      headerName: 'זמר',
      headerClassName: classes.header,
      editable: false,
    },
    {
      field: 'duration',
      width: 100,
      headerName: 'משך שיר',
      type: 'number',
      editable: false,
    },
    {
      field: 'plus',
      headerName: '',
      width: 10,
      type: 'actions',
      editable: false,
      renderCell: (params) => {
        return <PlusButton songId={params.row.id} songName={params.row.name} />;
      },
    },
    {
      field: 'favorite',
      headerName: '',
      width: 10,
      type: 'actions',
      editable: false,
      renderCell: (params) => {
        return (
          <FavoriteButton
            isFavorite={params.row.isFavorite}
            songId={params.row.id}
          />
        );
      },
    },
  ];

  return (
    <DataGridPro
      className={classes.table}
      rows={rows}
      columns={columns}
      hideFooter
      rowHeight={60}
      rowSelectionModel={!!currentSong ? currentSong.id : -1} // !!, use undefined instead of -1 - done
      onRowClick={(params) => changeCurrentSong(params)}
    />
  );
};

export default GenericDataTable;
