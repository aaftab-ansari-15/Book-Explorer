export const SCROLL_THRESHOLD = 100;
export const MAX_RESULTS = 20;
export const VIEW_MODES = {
    GRID: 'grid',
    LIST: 'list',
} as const;

export const EMPTY_STATES = {
    NO_BOOKS: 'No books found. Try a different search.',
    NO_FAVORITES: 'No favorite books yet. Start adding some!',
    LOADING: 'Loading books...',
    ERROR: 'An error occurred while fetching books.',
} as const; 