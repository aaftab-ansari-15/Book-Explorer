import React from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSearchParams } from '../redux/searchSlice';
import { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const dispatch = useAppDispatch();
  const searchParams = useAppSelector((state) => state.search.params);

  const handleChange = (field: keyof SearchParams) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchParams({
        ...searchParams,
        [field]: e.target.value
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.title && !searchParams.author && !searchParams.genre) {
      alert('Please fill in at least one search field');
      return;
    }
    onSearch(searchParams);
  };

  const inputClass =
    'w-full p-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-4 space-y-4 bg-white shadow-md rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-black">
        <input
          type="text"
          placeholder="Book Title"
          value={searchParams.title}
          onChange={handleChange('title')}
          className={inputClass}
          aria-label="Book Title"
        />
        <input
          type="text"
          placeholder="Author"
          value={searchParams.author}
          onChange={handleChange('author')}
          className={inputClass}
          aria-label="Author"
        />
        <input
          type="text"
          placeholder="Genre/Keyword"
          value={searchParams.genre}
          onChange={handleChange('genre')}
          className={inputClass}
          aria-label="Genre or Keyword"
        />
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
        >
          <Search size={20} />
          Search Books
        </button>
      </div>
    </form>
  );
};