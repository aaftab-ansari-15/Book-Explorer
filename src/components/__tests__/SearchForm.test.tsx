import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { SearchForm } from '../SearchForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSearchParams } from '../../redux/searchSlice';
import { SearchParams } from '../../types';

jest.mock('../../redux/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

jest.mock('../../redux/searchSlice', () => ({
    setSearchParams: jest.fn(),
}));

const mockAlert = jest.fn();
global.alert = mockAlert;

describe('SearchForm', () => {
    const mockDispatch = jest.fn();
    const mockSearchParams: SearchParams = {
        title: '',
        author: '',
        genre: '',
    };
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as jest.Mock).mockReturnValue(mockSearchParams);
    });

    const renderSearchForm = () => {
        return render(
            <Provider store={store}>
                <MemoryRouter>
                    <SearchForm onSearch={mockOnSearch} />
                </MemoryRouter>
            </Provider>
        );
    };

    it('renders the search form with all inputs', () => {
        renderSearchForm();

        expect(screen.getByPlaceholderText('Book Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Author')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Genre/Keyword')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search books/i })).toBeInTheDocument();
    });

    it('shows alert when submitting empty form', async () => {
        renderSearchForm();

        const searchButton = screen.getByRole('button', { name: /search books/i });
        fireEvent.click(searchButton);

        expect(mockAlert).toHaveBeenCalledWith('Please fill in at least one search field');
        expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it('submits the form with valid data', async () => {
        const updatedSearchParams = {
            title: 'Test Title',
            author: 'Test Author',
            genre: 'Test Genre',
        };

        (useAppSelector as jest.Mock).mockReturnValue(updatedSearchParams);
        renderSearchForm();

        const titleInput = screen.getByPlaceholderText('Book Title');
        const authorInput = screen.getByPlaceholderText('Author');
        const genreInput = screen.getByPlaceholderText('Genre/Keyword');
        const searchButton = screen.getByRole('button', { name: /search books/i });

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(authorInput, { target: { value: 'Test Author' } });
        fireEvent.change(genreInput, { target: { value: 'Test Genre' } });
        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith(updatedSearchParams);
        expect(mockAlert).not.toHaveBeenCalled();
    });

    it('updates the Redux store when inputs change', async () => {
        renderSearchForm();

        const titleInput = screen.getByPlaceholderText('Book Title');
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });

        expect(mockDispatch).toHaveBeenCalledWith(
            setSearchParams({
                ...mockSearchParams,
                title: 'Test Title',
            })
        );
    });
}); 