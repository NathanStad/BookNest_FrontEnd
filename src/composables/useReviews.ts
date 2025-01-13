import { ref } from 'vue';
import type { Review } from '../types/review';

// Load reviews from localStorage
const loadReviews = () => {
  const savedReviews = localStorage.getItem('bookReviews');
  if (savedReviews) {
    const reviews = JSON.parse(savedReviews);
    return reviews.map((review: any) => ({
      ...review,
      date: new Date(review.date)
    }));
  }
  return [];
};

// Save reviews to localStorage
const saveReviews = (reviews: Review[]) => {
  localStorage.setItem('bookReviews', JSON.stringify(reviews));
};

const reviews = ref<Review[]>(loadReviews());

export function useReviews() {
  const addReview = (bookId: number, review: { title: string; content: string; rating: number }) => {
    const newReview: Review = {
      id: Date.now(),
      bookId,
      title: review.title,
      content: review.content,
      author: 'John Doe', // TODO: Use actual user name when auth is implemented
      date: new Date(),
      rating: review.rating
    };

    reviews.value.unshift(newReview);
    saveReviews(reviews.value);
  };

  const getBookReviews = (bookId: number) => {
    return reviews.value.filter(review => review.bookId === bookId);
  };

  return {
    reviews,
    addReview,
    getBookReviews
  };
}