// components/BookList.tsx
import React from 'react';
import { RawBook } from '../types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface BookListProps {
    books: RawBook[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
    const location = useLocation();

    return (
        <div className="space-y-6 mt-10">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                    <img
                        src={book.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/128x192/cccccc/666666?text=No+Cover'}
                        alt={book.volumeInfo.title}
                        className="w-full sm:w-32 h-48 object-cover"
                    />
                    <div className="flex flex-col justify-between p-4 flex-1">
                        <div>
                            <Link
                                to={`/book/${book.id}`}
                                state={{ from: location.pathname }}
                                className="text-xl font-bold text-blue-700 hover:underline line-clamp-1"
                            >
                                {book.volumeInfo.title}
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">
                                {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                            </p>
                            <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                                {book.volumeInfo.description || 'No description available'}
                            </p>
                        </div>
                        <div className="mt-4 text-sm text-gray-400">
                            {book.volumeInfo.publishedDate || ''}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
