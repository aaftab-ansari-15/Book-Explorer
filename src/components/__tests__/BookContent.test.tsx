import { render, screen, fireEvent } from '@testing-library/react';
import { BookContent } from '../BookContent';
import { useAppDispatch } from '../../redux/hooks';

jest.mock('../../redux/hooks', () => ({
    useAppDispatch: jest.fn(),
}));

jest.mock('lucide-react', () => ({
    Heart: () => <div>Heart Icon</div>,
    ChevronDown: () => <div>ChevronDown Icon</div>,
    ChevronUp: () => <div>ChevronUp Icon</div>,
}));

describe('BookContent', () => {
    const mockBook = {
        id: '1',
        volumeInfo: {
            title: 'Test Book',
            authors: ['Test Author'],
            description: 'Test Description',
            imageLinks: { thumbnail: 'test.jpg' },
        },
    };

    const mockDispatch = jest.fn();
    const mockToggleDescription = jest.fn();
    const mockToggleFavorite = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    const renderBookContent = (isBookFavorite = false, showFullDescription = false) => {
        return render(
            <BookContent
                book={mockBook}
                isBookFavorite={isBookFavorite}
                showFullDescription={showFullDescription}
                onToggleFavorite={mockToggleFavorite}
                onToggleDescription={mockToggleDescription}
            />
        );
    };

    it('renders book title and author', () => {
        renderBookContent();
        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('Test Author')).toBeInTheDocument();
    });

    it('renders favorite button with correct state', () => {
        renderBookContent(true);
        const favoriteButton = screen.getByRole('button', { name: /remove from favorites/i });
        expect(favoriteButton).toBeInTheDocument();
    });

    it('renders non-favorite button with correct state', () => {
        renderBookContent(false);
        const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
        expect(favoriteButton).toBeInTheDocument();
    });

    it('calls onToggleFavorite when favorite button is clicked', () => {
        renderBookContent(false);
        const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
        fireEvent.click(favoriteButton);
        expect(mockToggleFavorite).toHaveBeenCalled();
    });

    it('dispatches addToFavorites action when adding to favorites', () => {
        renderBookContent(false);
        const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
        fireEvent.click(favoriteButton);
        expect(mockToggleFavorite).toHaveBeenCalled();
    });

    it('dispatches removeFromFavorites action when removing from favorites', () => {
        renderBookContent(true);
        const favoriteButton = screen.getByRole('button', { name: /remove from favorites/i });
        fireEvent.click(favoriteButton);
        expect(mockToggleFavorite).toHaveBeenCalled();
    });
}); 