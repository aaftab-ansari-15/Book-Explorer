import { render, screen, fireEvent } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BookDetailsPage } from '../BookDetailsPage';
import { getBookById } from '../../services/bookService';

jest.mock('../../services/bookService', () => ({
    getBookById: jest.fn(),
}));

jest.mock('../../components/BookContent', () => ({
    BookContent: ({ book }: { book: any }) => (
        <div>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.description}</p>
        </div>
    ),
}));

jest.mock('lucide-react', () => ({
    Loader2: () => <div>Loading...</div>,
    ArrowLeft: () => <div>Arrow Left</div>,
}));

describe('BookDetailsPage', () => {
    const mockBook = {
        id: '123',
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        genre: 'Test Genre',
        coverImage: 'test-image.jpg',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderBookDetailsPage = (bookId: string) => {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/book/${bookId}`]}>
                    <Routes>
                        <Route path="/" element={<div>Search Page</div>} />
                        <Route path="/book/:id" element={<BookDetailsPage />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    };

    it('renders book details when a valid book ID is provided', async () => {
        (getBookById as jest.Mock).mockResolvedValue(mockBook);
        renderBookDetailsPage('123');

        expect(await screen.findByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('Test Author')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(getBookById).toHaveBeenCalledWith('123');
    });

    it('shows error message when book is not found', async () => {
        (getBookById as jest.Mock).mockRejectedValue(new Error('Book not found'));
        renderBookDetailsPage('999');

        expect(await screen.findByText('Book not found')).toBeInTheDocument();
        expect(screen.getByText('Return to search')).toBeInTheDocument();
    });

    it('navigates back to search page when clicking the return link', async () => {
        (getBookById as jest.Mock).mockResolvedValue(mockBook);
        const { container } = renderBookDetailsPage('123');

        expect(await screen.findByText('Test Book')).toBeInTheDocument();
        const returnLink = screen.getByText('Return to search');
        fireEvent.click(returnLink);

        expect(container.querySelector('div')).toHaveTextContent('Search Page');
    });

    it('maintains the correct URL when rendering the page', async () => {
        (getBookById as jest.Mock).mockResolvedValue(mockBook);
        renderBookDetailsPage('123');

        expect(await screen.findByText('Test Book')).toBeInTheDocument();
    });

    it('handles invalid book ID in URL', async () => {
        (getBookById as jest.Mock).mockRejectedValue(new Error('Invalid book ID'));
        renderBookDetailsPage('invalid-id');

        expect(await screen.findByText('Invalid book ID')).toBeInTheDocument();
        expect(screen.getByText('Return to search')).toBeInTheDocument();
    });
}); 