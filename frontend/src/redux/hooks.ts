import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

type dispatchFunc = () => AppDispatch;
export const useAppDispatch: dispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // david should check if this isd iffent in magen
