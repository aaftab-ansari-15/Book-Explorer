import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Book } from '../types';

type BookContentProps = {
    book: Book;
    isBookFavorite: boolean;
    showFullDescription: boolean;
    onToggleFavorite: (e: React.MouseEvent) => void;
    onToggleDescription: () => void;
};

export const BookContent = ({
    book,
    isBookFavorite,
    showFullDescription,
    onToggleFavorite,
    onToggleDescription,
}: BookContentProps) => {
    const truncateDescription = (text: string, maxLength: number) => {
        if (!text) return 'No description available';
        const cleanText = text.replace(/<[^>]*>/g, '');
        if (cleanText.length <= maxLength) return cleanText;
        return cleanText.substring(0, maxLength) + '...';
    };

    const shortDescription = truncateDescription(book.volumeInfo.description || '', 200);
    const fullDescription = book.volumeInfo.description?.replace(/<[^>]*>/g, '') || 'No description available';

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
                <div className="md:w-1/3 w-full flex items-center justify-center bg-gray-50">
                    <div className="flex items-center justify-center h-full w-full">
                        <img
                            src={
                                book.volumeInfo.imageLinks?.thumbnail
                                    ? `${book.volumeInfo.imageLinks.thumbnail}&zoom=1`
                                    : 'https://placehold.co/300x450/cccccc/666666?text=No+Cover'
                            }
                            alt={`${book.volumeInfo.title || 'Book'} cover`}
                            className="max:h-46 max:w-36 max:h-96 max:w-64 md:h-82 md:w-auto object-contain shadow-md"
                        />
                    </div>
                </div>
                <div className="p-6 md:w-2/3 text-gray-600">
                    <h1 className="text-3xl font-bold mb-4">{book.volumeInfo.title}</h1>
                    <p className="text-xl mb-4">
                        {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {book.volumeInfo.publishedDate && (
                            <div>
                                <h2 className="font-semibold">Published</h2>
                                <p>{book.volumeInfo.publishedDate}</p>
                            </div>
                        )}
                        {book.volumeInfo.publisher && (
                            <div>
                                <h2 className="font-semibold">Publisher</h2>
                                <p>{book.volumeInfo.publisher}</p>
                            </div>
                        )}
                        {book.volumeInfo.pageCount && (
                            <div>
                                <h2 className="font-semibold">Pages</h2>
                                <p>{book.volumeInfo.pageCount}</p>
                            </div>
                        )}
                        {book.volumeInfo.categories && (
                            <div>
                                <h2 className="font-semibold">Categories</h2>
                                <p>{book.volumeInfo.categories.join(', ')}</p>
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <div className="text-gray-700">
                            {showFullDescription ? (
                                <div>
                                    <p className="whitespace-pre-line">{fullDescription}</p>
                                    <button
                                        onClick={onToggleDescription}
                                        className="text-blue-600 hover:underline mt-2 flex items-center gap-1"
                                    >
                                        <ChevronUp size={16} />
                                        Show Less
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p className="line-clamp-3">{shortDescription}</p>
                                    {book.volumeInfo.description && book.volumeInfo.description.length > 200 && (
                                        <button
                                            onClick={onToggleDescription}
                                            className="text-blue-600 hover:underline mt-2 flex items-center gap-1"
                                        >
                                            <ChevronDown size={16} />
                                            Show More
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={onToggleFavorite}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg ${isBookFavorite ? 'bg-red-100 text-red-600' : 'bg-blue-600 text-white'
                            } hover:bg-opacity-90 transition-colors`}
                    >
                        <Heart fill={isBookFavorite ? 'currentColor' : 'none'} />
                        {isBookFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        </div>
    );
};