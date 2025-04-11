import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, RawBook } from '../types';

interface BooksState {
    books: RawBook[];
    favorites: RawBook[];
}

const initialState: BooksState = {
    books: [],
    favorites: [],

};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addToBooks: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload.map(item => ({
                id: item.id,
                volumeInfo: {
                    title: item.volumeInfo?.title || 'No title available',
                    authors: item.volumeInfo?.authors,
                    description: item.volumeInfo?.description,
                    imageLinks: item.volumeInfo?.imageLinks?.thumbnail
                        ? { thumbnail: item.volumeInfo.imageLinks.thumbnail }
                        : undefined,
                    publishedDate: item.volumeInfo?.publishedDate
                }
            }));
        },
        appendBooks: (state, action: PayloadAction<RawBook[]>) => {
            const newBooks = action.payload.map(item => ({
                id: item.id,
                volumeInfo: {
                    title: item.volumeInfo?.title || 'No title available',
                    authors: item.volumeInfo?.authors,
                    description: item.volumeInfo?.description,
                    imageLinks: item.volumeInfo?.imageLinks?.thumbnail
                        ? { thumbnail: item.volumeInfo.imageLinks.thumbnail }
                        : undefined,
                    publishedDate: item.volumeInfo?.publishedDate
                }
            }));
            state.books = [...state.books, ...newBooks];
        },
        clearBooks: (state) => {
            state.books = [];
        },
        addToFavorites: (state, action: PayloadAction<RawBook>) => {
            const item = action.payload;
            if (!state.favorites.some(book => book.id === item.id)) {
                const bookToAdd = {
                    id: item.id,
                    volumeInfo: {
                        title: item.volumeInfo?.title || 'No title available',
                        authors: item.volumeInfo?.authors,
                        description: item.volumeInfo?.description,
                        imageLinks: item.volumeInfo?.imageLinks?.thumbnail
                            ? { thumbnail: item.volumeInfo.imageLinks.thumbnail }
                            : undefined,
                        publishedDate: item.volumeInfo?.publishedDate
                    }
                }

                state.favorites.push(bookToAdd);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(book => book.id !== action.payload);
        },
    },
});
export const isFavorite = (bookId: string) => (state: { books: BooksState }) =>
    state.books.favorites.some(book => book.id === bookId);
export const { addToFavorites, removeFromFavorites, addToBooks, appendBooks, clearBooks } = booksSlice.actions;
export default booksSlice.reducer;