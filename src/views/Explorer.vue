<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BookCard from '../components/BookCard.vue';
import Header from '../components/Header.vue';
import QrScanner from '../components/QrScanner.vue';

const route = useRoute();
const router = useRouter();
const filterContainer = ref<HTMLElement | null>(null);
const searchQuery = ref('');
const selectedGenre = ref('Tendance');
const showScanner = ref(false);

const baseGenres = [
  'Tendance',
  'Tous',
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

// Handle filter click
const handleFilterClick = (genre: string) => {
  if (selectedGenre.value === genre) {
    selectedGenre.value = 'Tendance';
  } else {
    selectedGenre.value = genre;
  }
  
  // Scroll to start of filter list
  if (filterContainer.value) {
    filterContainer.value.scrollTo({ left: 0, behavior: 'smooth' });
  }
};

const handleScan = (result: string) => {
  console.log('ISBN scanné:', result);
  // TODO: Implémenter la logique pour gérer le résultat du scan
};

// Activer le bon filtre en fonction du genre dans l'URL
onMounted(() => {
  const genreFromQuery = route.query.genre as string;
  if (genreFromQuery && baseGenres.includes(genreFromQuery)) {
    selectedGenre.value = genreFromQuery;
  }
});

const books = [
  {
    id: 1,
    title: 'The good guy',
    author: 'Mark mcallister',
    description: 'A story about a guy who was very good until the very end when..',
    image: '/images/book-example4.png'
  },
  {
    id: 2,
    title: 'The good guy',
    author: 'Mark mcallister',
    description: 'A story about a guy who was very good until the very end when..',
    image: '/images/book-example5.png'
  },
  {
    id: 3,
    title: 'The good guy',
    author: 'Mark mcallister',
    description: 'A story about a guy who was very good until the very end when..',
    image: '/images/book-example6.png'
  },
  {
    id: 4,
    title: 'The good guy',
    author: 'Mark mcallister',
    description: 'A story about a guy who was very good until the very end when..',
    image: '/images/book-example7.png'
  },
  {
    id: 1,
    title: 'The good guy',
    author: 'Mark mcallister',
    description: 'A story about a guy who was very good until the very end when..',
    image: '/images/book-example4.png'
  },
  {
    id: 2,
    title: 'The good guy',
    author: 'Mark mcallister',
    description: 'A story about a guy who was very good until the very end when..',
    image: '/images/book-example5.png'
  }
];

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
    placeholder="Chercher un livre..."
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
    <div 
      ref="filterContainer"
      class="overflow-x-auto hide-scrollbar px-4"
    >
      <div class="flex gap-2 py-3">
        <button
          v-for="genre in genres"
          :key="genre"
          @click="handleFilterClick(genre)"
          class="px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-300"
          :class="selectedGenre === genre 
            ? 'bg-title text-background' 
            : 'bg-[#D5CAC3] bg-opacity-50 text-primary'"
        >
          {{ genre }}
        </button>
      </div>
    </div>

    <!-- Books Grid -->
    <div class="px-4 grid grid-cols-2 gap-4 mt-4">
      <div 
        v-for="book in books" 
        :key="book.title"
        @click="goToDetail(book.id)"
        class="flex flex-col"
      >
        <img 
          :src="book.image" 
          :alt="book.title"
          class="w-full aspect-[2/3] object-cover rounded-lg shadow-md mb-2"
        />
        <h3 class="text-primary font-medium text-sm">{{ book.title }}</h3>
        <p class="text-primary/70 text-xs">{{ book.author }}</p>
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