import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SearchForm } from '../components/SearchForm';
import BookCard from '../components/BookCard';
import { RawBook, SearchParams } from '../types';
import { Loader2 } from 'lucide-react';
import { BookList } from '../components/BookList';
import { searchBooks } from '../services/bookService';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToBooks, appendBooks, clearBooks } from '../redux/bookSlice';
import { clearOffset, setHasMore, setOffset, setQuery } from '../redux/searchSlice';
import { ViewModeToggle } from '../components/ViewModeToggle';
import { EMPTY_STATES, MAX_RESULTS, SCROLL_THRESHOLD, VIEW_MODES } from '../constants';

export const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const { offset, hasMore, query } = useAppSelector((state) => state.search);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<typeof VIEW_MODES[keyof typeof VIEW_MODES]>(VIEW_MODES.GRID);

  const isFetching = useRef(false);

  const buildQuery = (params: SearchParams) => {
    return [
      params.title && `intitle:${params.title}`,
      params.author && `inauthor:${params.author}`,
      params.genre && `subject:${params.genre}`,
    ]
      .filter(Boolean)
      .join('+');
  };

  const fetchBooks = useCallback(
    async (initial = false) => {
      console.log('query', !query, isFetching.current, !hasMore);
      if (!query || isFetching.current || !hasMore) return;

      isFetching.current = true;
      setLoading(true);
      setError(null);

      try {
        const data = await searchBooks({
          query,
          startIndex: offset,
          maxResults: MAX_RESULTS,
        });

        if (!data.items || data.items.length === 0) {
          if (initial) {
            setError('No books found for this search. Try different keywords.');
            dispatch(clearBooks());
          }
          dispatch(setHasMore(false));
          return;
        }

        const newBooks = data.items;

        if (initial) {
          dispatch(addToBooks(newBooks));
        } else {
          dispatch(appendBooks(newBooks));
        }

        setHasMore(newBooks.length === MAX_RESULTS);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setHasMore(false);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [query, offset, hasMore, dispatch]
  );
  useEffect(() => {
    dispatch(setHasMore(true));
  }, [query]);
  const handleSearch = (params: SearchParams) => {
    const builtQuery = buildQuery(params);
    if (!builtQuery) {
      setError('Please enter at least one search parameter');
      return;
    }

    if (builtQuery !== query) {
      dispatch(setQuery(builtQuery));
      dispatch(clearOffset());
      setHasMore(true);
      setError(null);
      dispatch(clearBooks());
    }
  };
  const handleScroll = useCallback(() => {
    if (isFetching.current || !hasMore) return;

    const scrollPos = window.innerHeight + window.scrollY;
    const bottomPos = document.documentElement.offsetHeight;

    if (scrollPos >= bottomPos - SCROLL_THRESHOLD) {
      dispatch(setOffset(MAX_RESULTS));
    }
  }, [hasMore]);

  useEffect(() => {
    if (query && offset === 0) {
      fetchBooks(true);
    } else if (query && offset > 0) {
      fetchBooks();
    }
  }, [query, offset, fetchBooks]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      isFetching.current = false;
    };
  }, [handleScroll]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        📚 Book Explorer
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <SearchForm onSearch={handleSearch} />
      </div>

      {error && (
        <div className="text-red-600 text-center mt-6 font-medium" role="alert">
          {error}
        </div>
      )}

      <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />

      {books.length > 0 ? (
        viewMode === VIEW_MODES.GRID ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {books.map((book: RawBook) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <BookList books={books} />
        )
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-gray-500 mt-10">
            {EMPTY_STATES.NO_BOOKS}
          </p>
        )
      )}

      {loading && (
        <div className="flex justify-center mt-10">
          <Loader2 className="animate-spin text-blue-600" size={36} />
        </div>
      )}

      {!hasMore && books.length > 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">No more books to show</p>
      )}
    </div>
  );
};
