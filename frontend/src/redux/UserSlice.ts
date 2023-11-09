import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';
import User from '../types/user';

interface UserState {
  value: User | undefined;
}

const initialState: UserState = {
  value: undefined,
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    changeCurrentUserByValue: (state, inputUser: PayloadAction<User>) => {
      state.value = inputUser.payload;
    }, // Choose if u want to add logout, or remove the songslice second action. - done
    //byValue - to do
    resetCurrentUser: (state) => {
      state.value = undefined;
    },
  },
});

export const { changeCurrentUserByValue, resetCurrentUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;
export default userSlice.reducer;
