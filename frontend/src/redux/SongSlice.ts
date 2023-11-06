import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';
import Song from '../types/song';


interface SongState { // shouldnt be an interface if its just an object with one field - to do
    value: Song | undefined
};

const initialState: SongState = {
    value: undefined,
};

export const songSlice = createSlice({
    name: 'currentSong',
    initialState,
    reducers: {
        changeCurrentSongByValue: (state, inputSong: PayloadAction<Song>) => { // byValue // remove undefined, see also in user - to do
            state.value = inputSong.payload;
        },
        resetCurrentSong: (state) => {
            state.value = undefined;
        },
    }
});

export const { changeCurrentSongByValue, resetCurrentSong } = songSlice.actions;
export const selectSong = (state: RootState) => state.song.value;
export default songSlice.reducer;