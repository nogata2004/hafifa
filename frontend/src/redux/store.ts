import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'

import UserSlice from './UserSlice';
import SongSlice from './SongSlice';

const persistConfig = {
    key: 'spoofy',
    storage,
};

const reducer = combineReducers({
    user: UserSlice,
    song: SongSlice
});

const persistedReducer = persistReducer(
    persistConfig, reducer
);

export const store = configureStore({reducer: persistedReducer, middleware:[thunk]});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;