<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useBooks } from '../composables/useBooks';
import SliderDots from '../components/SliderDots.vue';
import AddReviewModal from '../components/AddReviewModal.vue';
import { ref, computed } from 'vue';
import { useReviews } from '../composables/useReviews';

const route = useRoute();
const router = useRouter();
const { books, toggleFavorite, toggleWishlist, toggleRead } = useBooks();
const { getBookReviews, addReview } = useReviews();
const currentReviewSlide = ref(1);
const reviewsContainer = ref<HTMLElement | null>(null);
const showAddReview = ref(false);

const book = books.value.find(b => b.id === Number(route.params.id));
const bookReviews = computed(() => getBookReviews(Number(route.params.id)));

const handleReviewScroll = (event: Event) => {
  const container = event.target as HTMLElement;
  const scrollPosition = container.scrollLeft;
  const width = container.clientWidth;
  currentReviewSlide.value = Math.floor(scrollPosition / width) + 1;
};

const goBack = () => {
  router.back();
};

const handleToggleWishlist = () => {
  if (book) {
    toggleWishlist(book.id);
  }
};

const handleToggleFavorite = () => {
  if (book) {
    toggleFavorite(book.id);
  }
};

const handleToggleRead = () => {
  if (book) {
    toggleRead(book.id);
  }
};

const handleAddReview = (review: { title: string; content: string }) => {
  addReview(Number(route.params.id), review);
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header avec boutons -->
    <div class="relative h-[400px]">
      <!-- Image de fond avec overlay -->
      <div class="absolute inset-0 overflow-hidden">
        <img 
          :src="book?.image" 
          :alt="book?.title"
          class="w-full h-full object-cover blur-sm opacity-80"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-background"></div>
      </div>

      <!-- Boutons de navigation -->
      <div class="relative z-10 flex justify-between items-start p-4">
        <button 
          @click="goBack"
          class="w-10 h-10 bg-[#707C6A] backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <span class="material-icons text-background">arrow_back</span>
        </button>
        <div class="flex flex-col gap-3">
          <button 
            @click="handleToggleWishlist"
            class="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center"
            :class="book?.isWishlist ? 'bg-[#707C6A] text-background' : 'bg-background/80 text-[#707C6A]'"
          >
            <span class="material-icons text-lg">bookmark</span>
          </button>
          <button 
            @click="handleToggleFavorite"
            class="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center"
            :class="book?.isFavorite ? 'bg-[#707C6A] text-background' : 'bg-background/80 text-[#707C6A]'"
          >
            <span class="material-icons text-lg">favorite</span>
          </button>
          <button 
            @click="handleToggleRead"
            class="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center"
            :class="book?.isRead ? 'bg-[#707C6A] text-background' : 'bg-background/80 text-[#707C6A]'"
          >
            <span class="material-icons text-lg">check_circle</span>
          </button>
        </div>
      </div>

      <!-- Couverture du livre -->
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4">
        <img 
          :src="book?.image" 
          :alt="book?.title"
          class="w-48 rounded-2xl shadow-2xl"
        />
      </div>
    </div>

    <!-- Contenu -->
    <div class="px-6 pt-4">
      <!-- Titre et auteur -->
<h1 class="text-3xl font-bold text-title text-center mb-2">{{ book?.title }}</h1>
      <p class="text-title/70 text-center mb-4">{{ book?.author }}</p>

      <!-- Genres -->
      <div class="flex justify-center gap-2 mb-6">
        <span 
          v-for="genre in ['Science-fiction', 'Fantaisie']" 
          :key="genre"
          class="px-4 py-1 rounded-full bg-title/10 text-title text-sm"
        >
          {{ genre }}
        </span>
      </div>

      <!-- Séparateur -->
      <div class="h-[3px] bg-[#707C6A] rounded-full my-6"></div>

      <!-- Synopsis -->
      <div class="mb-6">
        <h2 class="text-title font-medium mb-3">Synopsis</h2>
        <p class="text-title/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto.
        </p>
      </div>

      <!-- Informations -->
      <div class="flex justify-between text-sm text-title/70 mb-8">
        <span>Date de sortie : {{ new Date().toLocaleDateString() }}</span>
        <span>374 pages</span>
      </div>

      <!-- Séparateur -->
      <div class="h-[3px] bg-[#707C6A] rounded-full my-6"></div>

      <!-- Emprunter -->
      <div class="mb-8">
        <h2 class="text-title font-medium mb-4">Emprunter le livre</h2>
        <a 
          href="https://www.bcu-lausanne.ch/"
          target="_blank"
          class="w-full bg-[#707C6A] text-background rounded-lg p-4 flex items-center justify-between mb-2"
        >
          <span class="text-[#E9E1D6]">Bibliothèque de Lausanne</span>
          <span class="material-icons text-background">chevron_right</span>
        </a>
        <a 
          href="https://bibliothequevallorbe.ch/"
          target="_blank"
          class="w-full bg-[#707C6A] text-background rounded-lg p-4 flex items-center justify-between"
        >
          <span class="text-[#E9E1D6]">Bibliothèque de Vallorbe</span>
          <span class="material-icons text-background">chevron_right</span>
        </a>
      </div>

      <!-- Séparateur -->
      <div class="h-[3px] bg-[#707C6A] rounded-full my-6"></div>

      <!-- Avis -->
      <div>
        <h2 class="text-title font-medium mb-4">Avis</h2>
        <div 
          ref="reviewsContainer"
          class="flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 hide-scrollbar snap-x snap-mandatory"
          @scroll="handleReviewScroll"
        >
          <div 
            v-for="review in bookReviews" 
            :key="review.id"
            class="bg-[#707C6A] text-[#E9E1D6] rounded-lg p-4 w-[280px] flex-shrink-0 snap-start"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-medium text-[#E9E1D6]">{{ review.author }}</h3>
              <div class="flex">
                {{ '⭐'.repeat(review.rating || 5) }}
              </div>
            </div>
            <h4 class="font-medium text-[#E9E1D6]/90 text-sm mb-1">{{ review.title }}</h4>
            <p class="text-[#E9E1D6]/90 text-sm">{{ review.content }}</p>
          </div>
          <div v-if="bookReviews.length === 0" class="text-center text-title/70 p-4 w-full">
            Aucun avis pour le moment. Soyez le premier à donner votre avis !
          </div>
        </div>
        <div class="mt-4">
          <SliderDots 
            :total="Math.max(bookReviews.length, 1)"
            :current="currentReviewSlide"
            :group-size="1"
          />
        </div>

        <button 
          @click="showAddReview = true"
          class="px-6 py-3 rounded-lg bg-[#E9E1D6] text-[#707C6A] flex items-center justify-center gap-2 mx-auto mt-6 shadow-[0_4px_14px_rgba(112,124,106,0.4)]"
        >
          Ajouter un avis
          <span class="material-icons">add</span>
        </button>
      </div>

      <!-- ISBN -->
      <p class="text-center text-title/50 text-xs mt-8">
        Code ISBN : 978-3-16-148410-0
      </p>
      <!-- Ajout d'un petit padding en bas pour l'espacement -->
      <div class="h-8"></div>
    </div>
  </div>
  
  <!-- Add Review Modal -->
  <AddReviewModal
    v-if="showAddReview"
    @close="showAddReview = false"
    @submit="handleAddReview"
  />
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>