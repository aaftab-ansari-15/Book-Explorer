import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { useAppDispatch } from '../redux/hooks';
import { clearSearchParams } from '../redux/searchSlice';
import { clearBooks } from '../redux/bookSlice';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleReset = () => {
    dispatch(clearSearchParams())
    dispatch(clearBooks())
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-10">
        <div className="flex items-center justify-between h-18">
          <NavLink
            to="/"
            onClick={handleReset}
            className="text-4xl font-display text-blue-600">
            Book Explorer
          </NavLink>

          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Search size={20} />
              <span>Search</span>
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Heart size={20} />
              <span>Favorites</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};