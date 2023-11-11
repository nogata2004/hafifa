import React from 'react';
import { DataGridPro, GridRowParams, LicenseInfo } from '@mui/x-data-grid-pro';

import useStyles from './genericDataGridStyle';
import Song from '../../types/song';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  changeCurrentSongByValue,
  changeCurrentSongsList,
  resetCurrentSong,
} from '../../redux/SongSlice';
import { useGenericDataGrid } from './useGenericDataGrid';

interface Props {
  songs: Song[]; // use this as songs - done
}

const GenericDataTable: React.FC<Props> = ({ songs }) => {
  LicenseInfo.setLicenseKey(
    // move from comp - done
    '6239d8e4e4e446a3d208d638ff7603bdT1JERVI6Um9tLVRlc3QsRVhQSVJZPTIyMjMwNjEyMDAwMDAsS0VZVkVSU0lPTj0x'
  );

  const classes = useStyles();
  const currentSong = useAppSelector((state) => state.song.value);
  const dispatch = useAppDispatch();
  const { columns, rows } = useGenericDataGrid({ classes, songs });

  const changeCurrentSong = (params: GridRowParams) => {
    if (currentSong?.id === params.row.id) {
      dispatch(resetCurrentSong());
    } else {
      const selectedSong: Song = songs.find((song) => song.id === params.id)!;
      dispatch(changeCurrentSongByValue(selectedSong));
      dispatch(changeCurrentSongsList(songs));
    }
  };

  // make customhook useTable that returns column and rows - done column

  return (
    <DataGridPro
      className={classes.table}
      rows={rows}
      columns={columns}
      hideFooter
      rowHeight={60}
      rowSelectionModel={!!currentSong ? currentSong.id : -1}
      onRowClick={(params) => changeCurrentSong(params)}
    />
  );
};

export default GenericDataTable;
