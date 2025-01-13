export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  image: string;
  isFavorite: boolean;
  isWishlist: boolean;
  isRead: boolean;
}