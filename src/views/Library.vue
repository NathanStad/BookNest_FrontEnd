<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from '../components/Header.vue';
import BookCardWithActions from '../components/BookCardWithActions.vue';
import { useBooks } from '../composables/useBooks';

type FilterType = 'Wishlist' | 'Favoris' | 'J\'ai lu';
const selectedFilter = ref<FilterType>('Wishlist');
const { books, removeBook } = useBooks();

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
        :key="book.id"
        v-bind="book"
        :show-remove-button="true"
        @remove="removeBook(book.id)"
      />
    </div>
  </div>
</template>