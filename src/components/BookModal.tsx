import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Book } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToFavorites, removeFromFavorites, isFavorite } from '../redux/bookSlice';
import { getBookById } from '../services/bookService';
import { BookContent } from './BookContent';
import { Loader2 } from 'lucide-react';

type BookModalProps = {
    id: string;
    onClose: () => void;
};

export const BookModal = ({ id, onClose }: BookModalProps) => {
    const dispatch = useAppDispatch();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const isBookFavorite = useAppSelector((state) =>
        book?.id ? isFavorite(book.id)(state) : false
    );

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!book) return;
        if (isBookFavorite) {
            dispatch(removeFromFavorites(book.id));
        } else {
            dispatch(addToFavorites(book));
        }
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
                <Loader2 className="animate-spin" color='black' size={32} />
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
                <div className="text-center p-6 bg-white rounded-lg shadow-xl">
                    <p className="text-red-600">{error || 'Book not found'}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-5xl rounded-lg bg-white shadow-xl">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-400 z-10"
                    >
                        <X size={24} color='black' />
                    </button>

                    <div className="overflow-y-auto max-h-[90vh] p-2">
                        <BookContent
                            book={book}
                            isBookFavorite={isBookFavorite}
                            showFullDescription={showFullDescription}
                            onToggleFavorite={handleToggleFavorite}
                            onToggleDescription={toggleDescription}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};