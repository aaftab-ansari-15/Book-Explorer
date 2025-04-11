import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';
import searchReducer from './searchSlice';

export const testStore = configureStore({
    reducer: {
        books: booksReducer,
        search: searchReducer,
    },
}); 