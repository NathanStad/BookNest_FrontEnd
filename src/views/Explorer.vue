<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import QrScanner from '../components/QrScanner.vue';

const route = useRoute();
const router = useRouter();
const filterContainer = ref<HTMLElement | null>(null);
const searchQuery = ref('');
const selectedGenre = ref('Tous'); // Par défaut, tous les livres s'affichent
const showScanner = ref(false);
const isLoading = ref(true);
const books = ref([]); // Liste complète des livres
const filteredBooks = ref([]); // Liste des livres filtrés

const baseGenres = [
  'Tous',
  'Tendance',
  'Science-fiction',
  'Fantastique',
  'Dystopique',
  'Action & Aventure',
  'Mystère',
  'Thriller & Suspense',
  'Horreur',
  'Romance'
];

// Compute genres list with active filter first
const genres = computed(() => {
  if (selectedGenre.value === 'Tendance' || selectedGenre.value === 'Tous') {
    return baseGenres;
  }

  return [
    selectedGenre.value,
    ...baseGenres.filter(genre => genre !== selectedGenre.value)
  ];
});


const handleScan = (result: string) => {
  console.log('ISBN scanné:', result);
  // TODO: Implémenter la logique pour gérer le résultat du scan
};

// Fonction pour récupérer les livres depuis l'API avec pagination
const fetchBooks = async () => {
  const apiUrl = import.meta.env.VITE_API_URL; // URL de base de l'API
  let currentPage = 1;
  let totalPages = 6; // Ajustable selon la réponse API

  try {
    const fetchedBooks = [];

    while (currentPage <= totalPages) {
      const response = await fetch(`${apiUrl}books?page=${currentPage}&limit=6`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      const { books: newBooks, meta } = data || {};

      if (!newBooks || !meta) {
        throw new Error("Données invalides : livres ou méta-informations manquantes");
      }

      fetchedBooks.push(...newBooks);

      // Mise à jour des pages
      totalPages = meta.pages || totalPages;
      currentPage++;
    }

    // Stocker les données dans le localStorage
    localStorage.setItem('books', JSON.stringify(fetchedBooks));
    return fetchedBooks;
  } catch (err) {
    console.error("Erreur lors de la récupération des livres :", err);
    return [];
  } finally {
    isLoading.value = false; // Chargement terminé
  }
};

// Charger les livres depuis le localStorage ou l'API
const loadBooks = async () => {
  const storedBooks = localStorage.getItem('books');

  if (storedBooks) {
    books.value = JSON.parse(storedBooks);
    filteredBooks.value = books.value; // Par défaut, afficher tous les livres
    isLoading.value = false;
  } else {
    books.value = await fetchBooks();
    filteredBooks.value = books.value;
  }
};

// Appliquer un filtre combiné (genre + recherche)
const applyFilters = () => {
  let filtered = books.value;

  // Filtrer par genre
  if (selectedGenre.value !== 'Tous') {
    filtered = filtered.filter(book =>
      book.genres?.some(genre => genre?.name?.toLowerCase() === selectedGenre.value.toLowerCase())
    );
  }

  // Filtrer par texte
  const query = searchQuery.value.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter(book =>
      (book.title?.toLowerCase()?.includes(query) || book.author?.toLowerCase()?.includes(query))
    );
  }

  filteredBooks.value = filtered;
};

// Gérer le clic sur un bouton de genre
const handleFilterClick = (genre: string) => {
  selectedGenre.value = genre;
  applyFilters();
};

// Surveiller les changements dans l'input texte
watch(searchQuery, () => {
  applyFilters();
});

// Charger les livres lors du montage
onMounted(() => {
  loadBooks();
});

// Navigation vers les détails d'un livre
const goToDetail = (bookId: number) => {
  router.push({ name: 'book-detail', params: { id: bookId } });
};
</script>

<template>
  <div class="min-h-screen pb-20">
    <Header />
    <!-- Search Bar -->
    <div class="px-4 pt-4 pb-2">
      <div class="flex gap-2">
        <!-- Search Input -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Chercher un livre par titre ou auteur..."
          class="flex-1 bg-[#D5CAC3] bg-opacity-50 rounded-lg py-3 px-4 text-primary placeholder-primary/70 focus:outline-none"
        />
        <!-- Scan Button -->
        <button
          @click="showScanner = true"
          class="w-12 h-12 bg-title rounded-lg flex items-center justify-center">
          <span class="material-icons text-background text-xl">document_scanner</span>
        </button>
      </div>
    </div>

   <!-- Genre Filter -->
   <div ref="filterContainer" class="overflow-x-auto hide-scrollbar px-4">
      <div class="flex gap-2 py-3">
        <button
          v-for="genre in genres"
          :key="genre"
          @click="handleFilterClick(genre)"
          class="px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-300"
          :class="selectedGenre === genre 
            ? 'bg-title text-background' 
            : 'bg-[#D5CAC3] bg-opacity-50 text-primary'">
          {{ genre }}
        </button>
      </div>
    </div>

    <!-- Books Grid -->
    <div v-if="isLoading" class="text-center text-gray-500 py-6">Chargement...</div>
    <div v-else class="px-4 grid grid-cols-2 gap-4 mt-4">
      <div
        v-for="book in filteredBooks"
        :key="book._id"
        @click="goToDetail(book._id)"
        class="flex flex-col"
      >
        <img
          :src="book.cover_image"
          :alt="book.title"
          class="w-full aspect-[2/3] object-cover rounded-lg shadow-md mb-2"
        />
        <h3 class="text-primary font-medium text-sm">{{ book.title }}</h3>
        <p class="text-primary/70 text-xs">{{ book.author_id.name }}</p>
        <p class="text-primary/60 text-xs mt-1 line-clamp-2">{{ book.description }}</p>
      </div>
    </div>
  </div>

  <!-- QR Scanner Modal -->
  <QrScanner
    v-if="showScanner"
    @close="showScanner = false"
    @scan="handleScan"
  />
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
