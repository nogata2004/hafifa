import { PayloadAction, createSlice } from  '@reduxjs/toolkit';

import Mode from '../types/mode';
import { RootState } from './store';

interface ModeState {
    value: Mode
};

const initialState: ModeState = {
    value: Mode.song
};

export const modeSlice = createSlice({
    name: 'currentMode',
    initialState,
    reducers: {
        changeCurrentModeByValue: (state, inputMode: PayloadAction<Mode>) => {
            state.value = inputMode.payload;
        }
    }
});

export const {changeCurrentModeByValue} = modeSlice.actions;
export const selectMode = (state: RootState) => state.mode.value;
export default modeSlice.reducer;