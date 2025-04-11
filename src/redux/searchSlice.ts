import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchParams } from '../types';

interface SearchState {
    offset: number;
    params: SearchParams;
    query: string;
    hasMore: boolean;
}

const initialState: SearchState = {
    offset: 0,
    params: {
        title: '',
        author: '',
        genre: '',
    },
    query: '',
    hasMore: true,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = state.offset + action.payload;
        },
        clearOffset: (state) => {
            state.offset = 0;
        },
        setSearchParams: (state, action: PayloadAction<SearchParams>) => {
            state.params = action.payload;
        },
        clearSearchParams: (state) => {
            state.params = initialState.params;
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        clearQuery: (state) => {
            state.query = '';
        },
        setHasMore: (state, action: PayloadAction<boolean>) => {
            state.hasMore = action.payload;
        },
        resetSearchState: () => {
            return initialState;
        },
    },
});

export const {
    setOffset,
    clearOffset,
    setSearchParams,
    clearSearchParams,
    setQuery,
    clearQuery,
    setHasMore,
    resetSearchState,
} = searchSlice.actions;

export default searchSlice.reducer;