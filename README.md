# Book Explorer

A modern React-based web application for exploring and managing books using the Google Books API.

## Features

-  **Advanced Search**: Search books by title, author, or genre
-  **Book Details**: View comprehensive information about each book
-  **Favorites Management**: Save and manage your favorite books
-  **Responsive Design**: Works seamlessly across all devices
-  **Performance Optimized**: Fast and efficient user experience

## Tech Stack

- React 18 
- TypeScript
- Redux for state management
- React Router for navigation
- Tailwind CSS for styling
- Google Books API for book data

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/aaftab-ansari-15/Book-Explorer.git
cd book-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## Building for Production

```bash
npm run build
# or
yarn build
```

2. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── redux/         # Redux store and slices
├── services/      # API services
├── types/         # TypeScript type definitions
└── assets/        # Static assets
```

## Performance Optimizations

The application includes several performance optimizations to ensure smooth user experience:

1. **Code Splitting**: The book details page is lazy-loaded using React.lazy and Suspense, reducing the initial bundle size and improving load times.

2. **Memoization**: 
   - BookCard component is wrapped with React.memo to prevent unnecessary re-reenders
   - BookList uses useMemo for filtering books based on search query

3. **Data Optimization**:
   - Implemented a `RawBook` type that stores only essential book data (title, author, thumbnail, description) for search and favorites pages
   - This reduces memory usage in Redux store by not storing unnecessary book details
   - Full book details are fetched only when viewing the book details page

4. **Future Optimizations**:
   - **Scroll-based Data Management**: Implement a sliding window approach for infinite scroll:
     - Maintain a fixed window of 100 items in Redux store
     - When scrolling down, remove oldest 20 items and fetch 20 new items
     - When scrolling up, remove newest 20 items and fetch previous 20 items
     - This ensures constant memory usage while providing seamless infinite scroll experience

## API Integration

The application uses the Google Books API for fetching book data:

- Base URL: `https://www.googleapis.com/books/v1/volumes`
- Search parameters:
  - `q`: Search query (supports `intitle:`, `inauthor:`, etc.)
  - `maxResults`: Number of results (default: 10, max: 40)
  - `startIndex`: For pagination

Example API call:
```javascript
fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:react&maxResults=20`)
```

## Acknowledgments

- Google Books API for providing book data
- React and the open-source community for amazing tools and libraries


