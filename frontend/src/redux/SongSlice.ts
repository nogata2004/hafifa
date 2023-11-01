import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';
import Song from '../types/song';


interface SongState { // shouldnt be an interface if its just an object with one field
    value: Song | undefined,
};

const initialState: SongState = {
    value: undefined,
};

export const songSlice = createSlice({
    name: 'currentSong',
    initialState,
    reducers: {
        changeCurrentSongByValue: (state, inputSong: PayloadAction<Song | undefined>) => { // byValue // remove undefined, see also in user
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