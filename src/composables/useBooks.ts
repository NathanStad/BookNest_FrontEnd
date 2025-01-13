import { ref } from 'vue';
import type { Book } from '../types/book';

// Fonction pour charger les états depuis le localStorage
const loadBookStates = () => {
  const savedStates = localStorage.getItem('bookStates');
  if (savedStates) {
    const states = JSON.parse(savedStates);
    return states;
  }
  return {};
};

// Fonction pour sauvegarder les états dans le localStorage
const saveBookStates = (states: Record<number, { isFavorite: boolean; isWishlist: boolean; isRead: boolean }>) => {
  localStorage.setItem('bookStates', JSON.stringify(states));
};

// Charger les états sauvegardés
const savedStates = loadBookStates();

// État global partagé
const books = ref<Book[]>([
  {
    id: 1,
    title: 'The good guy',
    author: 'Mark mcallister',
    genre: 'Thriller',
    image: '/images/book-example4.png',
    isFavorite: savedStates[1]?.isFavorite ?? false,
    isWishlist: savedStates[1]?.isWishlist ?? false,
    isRead: savedStates[1]?.isRead ?? false
  },
  {
    id: 2,
    title: 'Norse Mythology',
    author: 'Neil Gaiman',
    genre: 'Fantasy',
    image: '/images/book-example5.png',
    isFavorite: savedStates[2]?.isFavorite ?? false,
    isWishlist: savedStates[2]?.isWishlist ?? false,
    isRead: savedStates[2]?.isRead ?? false
  },
  {
    id: 3,
    title: 'Futurama',
    author: 'Various Authors',
    genre: 'Science Fiction',
    image: '/images/book-example6.png',
    isFavorite: savedStates[3]?.isFavorite ?? false,
    isWishlist: savedStates[3]?.isWishlist ?? false,
    isRead: savedStates[3]?.isRead ?? false
  },
  {
    id: 4,
    title: 'Creative Mind',
    author: 'Jane Doe',
    genre: 'Self Help',
    image: '/images/book-example7.png',
    isFavorite: savedStates[4]?.isFavorite ?? false,
    isWishlist: savedStates[4]?.isWishlist ?? false,
    isRead: savedStates[4]?.isRead ?? false
  }
]);

export function useBooks() {
  const toggleFavorite = (bookId: number) => {
    const book = books.value.find(b => b.id === bookId);
    if (book) {
      book.isFavorite = !book.isFavorite;
      // Sauvegarder l'état
      const states = loadBookStates();
      states[bookId] = {
        isFavorite: book.isFavorite,
        isWishlist: book.isWishlist,
        isRead: book.isRead
      };
      saveBookStates(states);
    }
  };

  const toggleWishlist = (bookId: number) => {
    const book = books.value.find(b => b.id === bookId);
    if (book) {
      book.isWishlist = !book.isWishlist;
      // Sauvegarder l'état
      const states = loadBookStates();
      states[bookId] = {
        isFavorite: book.isFavorite,
        isWishlist: book.isWishlist,
        isRead: book.isRead
      };
      saveBookStates(states);
    }
  };

  const toggleRead = (bookId: number) => {
    const book = books.value.find(b => b.id === bookId);
    if (book) {
      book.isRead = !book.isRead;
      // Sauvegarder l'état
      const states = loadBookStates();
      states[bookId] = {
        isFavorite: book.isFavorite,
        isWishlist: book.isWishlist,
        isRead: book.isRead
      };
      saveBookStates(states);
    }
  };

  const removeBook = (bookId: number) => {
    const index = books.value.findIndex(b => b.id === bookId);
    if (index !== -1) {
      books.value.splice(index, 1);
      // Supprimer l'état du livre
      const states = loadBookStates();
      delete states[bookId];
      saveBookStates(states);
    }
  };

  const getBookById = (id: number) => {
    return books.value.find(b => b.id === id);
  };

  return {
    books,
    toggleFavorite,
    toggleWishlist,
    toggleRead,
    removeBook,
    getBookById
  };
}