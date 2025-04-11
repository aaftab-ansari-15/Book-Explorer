import React, { useState, memo } from 'react';
import { RawBook } from '../types';
import { Heart, MoreVertical, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToFavorites, isFavorite, removeFromFavorites } from '../redux/bookSlice';
import { useLocation } from 'react-router-dom';
import { BookModal } from './BookModal';

interface BookCardProps {
  book: RawBook;
}

const BookCard: React.FC<BookCardProps> = memo(({ book }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isBookFavorite = useAppSelector((state) => isFavorite(book.id)(state));
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string>('');
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBookFavorite) {
      dispatch(removeFromFavorites(book.id));
    } else {
      dispatch(addToFavorites(book));
    }
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  const handleOpenBookModal = (id: string) => {
    setShowModal(true);
    setSelectedBookId(id);
    setShowMenu(false);

  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBookId("");
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
      {/* Image with hover overlay */}
      <div className="relative overflow-hidden">
        <Link
          to={`/book/${book.id}`}
          state={{ from: location.pathname }}
          className="block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/128x192/cccccc/666666?text=No+Cover'}
            alt={`${book.volumeInfo.title} cover`}
            className={`w-full h-48 object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white bg-opacity-90 rounded-full p-2 flex items-center justify-center">
              <ExternalLink size={20} className="text-gray-800" />
            </div>
          </div>
        </Link>
      </div>

      {/* Menu button */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleMenuToggle}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors bg-white bg-opacity-80 backdrop-blur-sm"
          aria-label="More options"
        >
          <MoreVertical size={20} color='black' />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
            <Link
              to={`/book/${book.id}`}
              state={{ from: location.pathname }}
              className="flex  w-full  items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMenu(false)}
            >
              <ExternalLink size={16} className="mr-2" />
              View Details
            </Link>
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleOpenBookModal(book.id)}
            >
              Open as modal
            </button>
          </div>
        )}
      </div>

      {/* Book info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-black hover:text-blue-600 transition-colors">
          <Link to={`/book/${book.id}`} state={{ from: location.pathname }}>
            {book.volumeInfo.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {book.volumeInfo.description || 'No description available'}
        </p>
      </div>

      {/* Favorite button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleToggleFavorite}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full justify-center transition-all duration-200 ${isBookFavorite
            ? 'bg-red-50 text-red-600 hover:bg-red-100'
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          aria-label={isBookFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`transition-transform ${isBookFavorite ? 'scale-110' : 'scale-100'}`}
            fill={isBookFavorite ? 'currentColor' : 'none'}
          />
          <span className="font-medium">
            {isBookFavorite ? 'In Favorites' : 'Add to Favorites'}
          </span>
        </button>
      </div>
      {showModal && selectedBookId && <BookModal
        id={selectedBookId}
        onClose={handleCloseModal}
      />}
    </div>
  );
});

export default BookCard;