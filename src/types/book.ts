export interface Book {
  _id: number;
  title: string;
  author_id: string;
  genres: Array<string>;
  cover_image: string;
  isFavorite: boolean;
  isWishlist: boolean;
  isRead: boolean;
}