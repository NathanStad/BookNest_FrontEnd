export interface Review {
  id: number;
  bookId: number;
  title: string;
  content: string;
  rating?: number;
  author: string;
  date: Date;
}