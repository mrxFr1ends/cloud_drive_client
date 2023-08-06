import { configureStore } from '@reduxjs/toolkit';
import { RootState, rootReducer } from "./reducers";
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;