import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;