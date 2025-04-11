import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

// Mock the pages to avoid loading actual components
jest.mock('../pages/SearchPage', () => ({
    SearchPage: () => <div>Search Page</div>,
}));

jest.mock('../pages/FavoritesPage', () => ({
    FavoritesPage: () => <div>Favorites Page</div>,
}));

jest.mock('../pages/BookDetailsPage', () => ({
    BookDetailsPage: () => <div>Book Details Page</div>,
}));

// Mock the Loader2 component
jest.mock('lucide-react', () => ({
    Loader2: () => <div>Loading...</div>,
    Search: () => <div>Search Icon</div>,
    Heart: () => <div>Heart Icon</div>,
    ArrowLeft: () => <div>Arrow Left</div>,
}));

describe('App Routing', () => {
    const renderApp = (initialPath = '/') => {
        window.history.pushState({}, '', initialPath);
        return render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    };

    beforeEach(() => {
        window.history.pushState({}, '', '/');
        jest.clearAllMocks();
    });

    it('renders SearchPage at the root route', () => {
        renderApp();
        expect(screen.getByText('Search Page')).toBeInTheDocument();
    });

    it('navigates to FavoritesPage when clicking the favorites link', () => {
        renderApp();
        const favoritesLink = screen.getByText('Favorites');
        fireEvent.click(favoritesLink);
        expect(screen.getByText('Favorites Page')).toBeInTheDocument();
    });

    it('navigates back to SearchPage when clicking the search link', () => {
        renderApp('/favorites');
        const searchLink = screen.getByText('Search');
        fireEvent.click(searchLink);
        expect(screen.getByText('Search Page')).toBeInTheDocument();
    });


    it('maintains navigation state after page refresh', () => {
        renderApp('/favorites');
        expect(screen.getByText('Favorites Page')).toBeInTheDocument();
    });
}); 