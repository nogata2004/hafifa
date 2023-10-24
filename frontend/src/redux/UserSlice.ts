import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';
import User from '../types/user';

interface UserState {
    value: User | undefined
};

const initialState: UserState = {
    value: undefined
};

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        changeCurrentUserByValue: (state, inputUser: PayloadAction<User | undefined>) => {
            state.value = inputUser.payload;
        }
    }
});

export const { changeCurrentUserByValue } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;
export default userSlice.reducer;