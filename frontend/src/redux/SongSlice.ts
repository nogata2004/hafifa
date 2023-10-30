import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GridRowId } from '@mui/x-data-grid-pro';

import { RootState } from './store';
import Song from '../types/song';


interface SongState {
    value: Song | undefined,
    selectionModel: GridRowId[]
};

const initialState: SongState = {
    value: undefined,
    selectionModel: []
};

export const songSlice = createSlice({
    name: 'currentSong',
    initialState,
    reducers: {
        changeCurrentSongByValue: (state, inputSong: PayloadAction<Song | undefined>) => {
            state.value = inputSong.payload;
        },
        changeCurrentSelectionModel: (state, inputSelectionModel: PayloadAction<GridRowId[]>) => {
            state.selectionModel = inputSelectionModel.payload;
        },
        resetCurrentSong: (state) => {
            state.value = undefined;
            state.selectionModel = []
        },
    }
});

export const { changeCurrentSongByValue, resetCurrentSong, changeCurrentSelectionModel } = songSlice.actions;
export const selectSong = (state: RootState) => state.song.value;
export default songSlice.reducer;