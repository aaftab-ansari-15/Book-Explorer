export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    categories?: string[];
  };
}
export interface RawBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate?: string;
  }
}
export interface SearchParams {
  title?: string;
  author?: string;
  genre?: string;
}