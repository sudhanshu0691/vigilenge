import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userInfo from './reducer/userInfo';

const rootReducer = combineReducers({
  counter: userInfo,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
