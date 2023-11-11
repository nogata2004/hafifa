import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';
import Song from '../types/song';

interface SongState {
  value: Song | undefined;
  songsList: Song[] | undefined;
}

const initialState: SongState = {
  value: undefined,
  songsList: undefined,
};

export const songSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    changeCurrentSongByValue: (state, inputSong: PayloadAction<Song>) => {
      state.value = inputSong.payload;
    },
    changeCurrentSongsList: (state, inputSongs: PayloadAction<Song[]>) => {
      state.songsList = inputSongs.payload;
    },
    resetCurrentSong: (state) => {
      state.value = undefined;
      state.songsList = undefined;
    },
  },
});

export const {
  changeCurrentSongByValue,
  changeCurrentSongsList,
  resetCurrentSong,
} = songSlice.actions;
export const selectSong = (state: RootState) => state.song.value;
export default songSlice.reducer;
