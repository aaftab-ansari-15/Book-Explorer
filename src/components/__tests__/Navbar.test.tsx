import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Navbar } from '../Navbar';
import { useAppDispatch } from '../../redux/hooks';
import { clearSearchParams } from '../../redux/searchSlice';
import { clearBooks } from '../../redux/bookSlice';

jest.mock('../../redux/hooks', () => ({
    useAppDispatch: jest.fn(),
}));

jest.mock('../../redux/searchSlice', () => ({
    clearSearchParams: jest.fn(),
}));

jest.mock('../../redux/bookSlice', () => ({
    clearBooks: jest.fn(),
}));

describe('Navbar', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        window.history.pushState({}, '', '/');
    });

    const renderNavbar = (initialPath = '/') => {
        window.history.pushState({}, '', initialPath);
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
    };

    it('renders all navigation links', () => {
        renderNavbar();

        expect(screen.getByText('Book Explorer')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Favorites')).toBeInTheDocument();
    });

    it('clears search and book state when clicking the logo', () => {
        renderNavbar();

        const logoLink = screen.getByText('Book Explorer');
        fireEvent.click(logoLink);

        expect(mockDispatch).toHaveBeenCalledWith(clearSearchParams());
        expect(mockDispatch).toHaveBeenCalledWith(clearBooks());
    });

    it('applies active styles to the current route', () => {
        renderNavbar('/');

        const searchLink = screen.getByText('Search').closest('a');
        const favoritesLink = screen.getByText('Favorites').closest('a');

        expect(searchLink).toHaveClass('bg-blue-100', 'text-blue-600');
        expect(favoritesLink).not.toHaveClass('bg-blue-100', 'text-blue-600');
    });

    it('applies active styles to favorites route', () => {
        renderNavbar('/favorites');

        const searchLink = screen.getByText('Search').closest('a');
        const favoritesLink = screen.getByText('Favorites').closest('a');

        expect(favoritesLink).toHaveClass('bg-blue-100', 'text-blue-600');
        expect(searchLink).not.toHaveClass('bg-blue-100', 'text-blue-600');
    });

    it('navigates to the correct routes when clicking links', () => {
        renderNavbar();

        const favoritesLink = screen.getByText('Favorites');
        fireEvent.click(favoritesLink);
        expect(window.location.pathname).toBe('/favorites');

        const searchLink = screen.getByText('Search');
        fireEvent.click(searchLink);
        expect(window.location.pathname).toBe('/');
    });
}); 