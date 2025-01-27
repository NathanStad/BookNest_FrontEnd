<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Header from '../components/Header.vue';
import BookCardWithActions from '../components/BookCardWithActions.vue';

type FilterType = 'Wishlist' | 'Favoris' | 'J\'ai lu';
const selectedFilter = ref<FilterType>('Wishlist');

// Liste des livres
const books = ref([]); // Réactive pour stocker les livres synchronisés

// Charger les livres du localStorage
const loadBooksFromLocalStorage = () => {
  const storedBooks = localStorage.getItem('books');
  return storedBooks ? JSON.parse(storedBooks) : [];
};

// Synchroniser les états des livres avec l'API
const syncBookStates = async (userId: string, localBooks: any[]) => {
  const apiUrl = `https://booknest-restapi.onrender.com/api/users/${userId}`;
  try {
    const [wishlistResponse, favoriteResponse, readResponse] = await Promise.all([
      fetch(`${apiUrl}/wishlist`),
      fetch(`${apiUrl}/favorites`),
      fetch(`${apiUrl}/already-read`),
    ]);

    if (!wishlistResponse.ok || !favoriteResponse.ok || !readResponse.ok) {
      throw new Error('Erreur lors de la synchronisation des états des livres.');
    }

    const wishlistData = await wishlistResponse.json();
    const favoriteData = await favoriteResponse.json();
    const readData = await readResponse.json();
    console.log('Données de synchronisation :', wishlistData, favoriteData, readData);
    
    // Ajouter les états correspondants pour chaque livre local
    return localBooks.map(book => ({
      ...book,
      isWishlist: wishlistData.some((item: any) => item.book_id._id === book._id) || false,
      isFavorite: favoriteData.some((item: any) => item.book_id._id === book._id) || false,
      isRead: readData.some((item: any) => item.book_id._id === book._id) || false,
    }));
    
  } catch (error) {
    console.error('Erreur lors de la synchronisation des états des livres :', error);
    // Ajouter des valeurs par défaut en cas d'erreur
    return localBooks.map(book => ({
      ...book,
      isWishlist: false,
      isFavorite: false,
      isRead: false,
    }));
  }};


// Charger et synchroniser les livres lors du montage
onMounted(async () => {
  const userId = JSON.parse(localStorage.getItem('user')).id ;

  if (!userId) {
    console.error('Utilisateur non connecté.');
    return;
  }

  const localBooks = loadBooksFromLocalStorage();
  books.value = await syncBookStates(userId, localBooks);
  console.log('Livres synchronisés :', books.value);
  
});

// Filtrage des livres
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    switch (selectedFilter.value) {
      case 'Favoris': return book.isFavorite;
      case 'Wishlist': return book.isWishlist;
      case 'J\'ai lu': return book.isRead;
      default: return false;
    }
  });
});
</script>

<template>
  <div class="min-h-screen pb-20">
    <Header />
    
    <!-- Filters -->
    <div class="px-4 pt-4 flex gap-2">
      <button
        v-for="filter in ['Wishlist', 'Favoris', 'J\'ai lu']"
        :key="filter"
        @click="selectedFilter = filter"
        class="px-6 py-2 rounded-full text-sm transition-colors"
        :class="selectedFilter === filter 
          ? 'bg-title text-background' 
          : 'bg-[#D5CAC3] bg-opacity-50 text-primary'"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Books Grid -->
    <div class="px-4 grid grid-cols-2 gap-4 mt-6">
      <BookCardWithActions
        v-for="book in filteredBooks"
        :key="book._id"
        v-bind="book"
        :show-remove-button="true"
      />
    </div>
  </div>
</template>
