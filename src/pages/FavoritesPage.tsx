import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import { BookList } from '../components/BookList';
import { useAppSelector } from '../redux/hooks';
import { Heart, BookOpen } from 'lucide-react';
import { ViewModeToggle } from '../components/ViewModeToggle';
import { EMPTY_STATES, VIEW_MODES } from '../constants';

export const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector((state) => state.books.favorites);
  const [viewMode, setViewMode] = useState<typeof VIEW_MODES[keyof typeof VIEW_MODES]>(VIEW_MODES.GRID);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Heart className="text-red-600 w-8 h-8" fill="currentColor" />
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
            My Favorite Books
          </h1>
        </div>

        <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />

        {favorites.length === 0 ? (
          <div className="text-center mt-16 text-gray-600">
            <BookOpen className="mx-auto mb-4 w-10 h-10 text-gray-400" />
            <p className="text-lg font-medium">{EMPTY_STATES.NO_FAVORITES}</p>
          </div>
        ) : (
          viewMode === VIEW_MODES.GRID ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
              {favorites.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <BookList books={favorites} />
            </div>
          )
        )}
      </div>
    </div>
  );
};
