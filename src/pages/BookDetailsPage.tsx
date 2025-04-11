import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Book } from '../types';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { addToFavorites, removeFromFavorites, isFavorite } from '../redux/bookSlice';
import { getBookById } from '../services/bookService';
import { BookContent } from '../components/BookContent';

export const BookDetailsPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location.state?.from || '/';
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const isBookFavorite = useAppSelector((state) =>
    book?.id ? isFavorite(book.id)(state) : false
  );

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError('No book ID provided');
        setLoading(false);
        return;
      }

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
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" color='black' size={32} />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">{error || 'Book not found'}</p>
        <Link
          to={from}
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          <ArrowLeft size={20} />Return to search
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to={from}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={20} />Return to search
      </Link>
      <BookContent
        book={book}
        isBookFavorite={isBookFavorite}
        showFullDescription={showFullDescription}
        onToggleFavorite={handleToggleFavorite}
        onToggleDescription={toggleDescription}
      />
    </div>
  );
};