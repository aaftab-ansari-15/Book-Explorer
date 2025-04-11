import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Loader2 } from 'lucide-react';
import { SearchPage } from './pages/SearchPage';
import { FavoritesPage } from './pages/FavoritesPage';

const BookDetailsPage = lazy(() => import('./pages/BookDetailsPage').then(module => ({ default: module.BookDetailsPage })));

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-red-50">
                <Navbar />
                <Suspense
                    fallback={
                        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                            <Loader2 className="animate-spin" color="black" size={32} />
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<SearchPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route
                            path="/book/:id"
                            element={
                                <Suspense fallback={<div className="text-center">Loading...</div>}>
                                    <BookDetailsPage />
                                </Suspense>
                            }
                        />
                    </Routes>
                </Suspense>
            </div>
        </BrowserRouter>
    );
}

export default App;
