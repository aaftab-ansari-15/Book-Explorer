// src/services/bookService.ts
import axios, { AxiosResponse } from 'axios';
import { Book } from '../types'; // Assuming you have a Book type defined

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Interface for search parameters (adjust based on your needs)
interface SearchBooksParams {
    query: string;
    startIndex: number;
    maxResults: number;
}

// Fetch a single book by ID
export const getBookById = async (id: string): Promise<Book> => {
    try {
        const response: AxiosResponse<Book> = await axios({
            method: 'GET',
            url: `${BASE_URL}/${id}`,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            axios.isAxiosError(error)
                ? error.response?.data?.error?.message || 'Failed to fetch book'
                : 'An unexpected error occurred'
        );
    }
};

// Fetch a list of books based on search parameters
export const searchBooks = async ({
    query,
    startIndex,
    maxResults,
}: SearchBooksParams): Promise<{ items: Book[]; totalItems: number }> => {
    try {
        const response: AxiosResponse<{ items: Book[]; totalItems: number }> =
            await axios({
                method: 'GET',
                url: BASE_URL,
                params: {
                    q: query,
                    startIndex,
                    maxResults,
                },
            });

        return response.data;
    } catch (error) {
        throw new Error(
            axios.isAxiosError(error)
                ? error.response?.data?.error?.message || 'Failed to fetch books'
                : 'An unexpected error occurred'
        );
    }
};