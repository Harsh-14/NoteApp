import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../reducers/authReducers';
import  noteReducers from '../reducers/noteReducers';

export const store = configureStore({
  reducer: {
    user:authReducers,
    note:noteReducers
  },
});
