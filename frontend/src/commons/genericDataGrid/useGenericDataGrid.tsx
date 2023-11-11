import { GridColDef } from '@mui/x-data-grid-pro';
import { ClassNameMap } from '@mui/material';

import { durationFormat } from '../../functions/durationFormat';
import PlusButton from './plusButton/plusButton';
import FavoriteButton from './favoriteButton/favoriteButton';
import Song from '../../types/song';

interface Row {
  id: string;
  name: string;
  artist: string;
  duration: string;
  isFavorite: boolean;
}

interface Props {
  classes: ClassNameMap<'table' | 'header'>;
  songs: Song[];
}

export const useGenericDataGrid = (props: Props) => {
  const { classes, songs } = props;

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

  const rows: Row[] = [];
  songs.forEach((song) => {
    // change to foreach - done
    rows.push({
      id: song.id,
      name: song.name,
      artist: song.artist.name,
      duration: durationFormat(song.duration),
      isFavorite: song.isFavorite,
    });
  });

  return { columns, rows };
};
