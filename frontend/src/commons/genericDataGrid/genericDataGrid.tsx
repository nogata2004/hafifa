import React, { useContext } from 'react';
import { DataGridPro, GridColDef, GridRowParams, LicenseInfo } from '@mui/x-data-grid-pro';

import useStyles from './genericDataGridStyle';
import Song from '../../types/song';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { changeCurrentSongByValue, resetCurrentSong } from '../../redux/SongSlice';
import durationFormat from '../../functions/dorationFormat';
import FavoriteButton from './favoriteButton/favoriteButton';
import { AllSongsContext } from '../../components/db/context';
import PlusButton from './plusButton/plusButton';


interface Props {
    filterSongs: Song[];
};

interface Row {
    id: string,
    name: string,
    artist: string,
    duration: string,
    isFavorite: boolean
};

const GenericDataTable: React.FC<Props> = ({ filterSongs }) => {
    const classes = useStyles();
    const currentSong = useAppSelector((state) => state.song.value);
    const dispatch = useAppDispatch();
    const { songs } = useContext(AllSongsContext);

    LicenseInfo.setLicenseKey(
        '6239d8e4e4e446a3d208d638ff7603bdT1JERVI6Um9tLVRlc3QsRVhQSVJZPTIyMjMwNjEyMDAwMDAsS0VZVkVSU0lPTj0x'
    );

    const changeCurrentSong = (params: GridRowParams) => {
        if (currentSong?.id === params.row.id) {
            dispatch(resetCurrentSong());
        }
        else {
            const selectedSong: Song | undefined = songs.find((song) => song.id === params.id);
            dispatch(changeCurrentSongByValue(selectedSong));
        };
    };

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
                return (
                    <PlusButton
                        songId={params.row.id}
                        songName={params.row.name}
                    />
                )
            }
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
                )
            }
        },
    ];

    const rows: Row[] = [];
    filterSongs.map((song) => {
        rows.push({
            id: song.id,
            name: song.name,
            artist: song.artist.name,
            duration: durationFormat(song.duration),
            isFavorite: song.isFavorite
        });
    });

    return (
        <DataGridPro
            className={classes.table}
            rows={rows}
            columns={columns}
            hideFooter
            rowHeight={60}
            rowSelectionModel={currentSong ? currentSong.id : -1}
            onRowClick={(params) => changeCurrentSong(params)}
        />
    );
};

export default GenericDataTable;