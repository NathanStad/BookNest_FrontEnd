<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BookCard from './BookCard.vue';
import SliderDots from './SliderDots.vue';

const router = useRouter();

const props = defineProps<{
  title: string;
  books: Array<{
    id: number;
    title: string;
    author: string;
    genre: string;
    image: string;
  }>;
  genre?: string;
}>();

const currentSlide = ref(1);
const totalSlides = computed(() => Math.ceil(props.books.length / 3));

const handleScroll = (event: Event) => {
  const container = event.target as HTMLElement;
  const scrollPosition = container.scrollLeft;
  const width = container.clientWidth;
  currentSlide.value = Math.floor(scrollPosition / width) + 1;
};

const navigateToExplorer = () => {
  router.push({
    path: '/explorer',
    query: { genre: props.genre || props.title }
  });
};
</script>

<template>
  <section class="my-6 px-4">
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-title text-base font-medium">{{ title }}</h2>
      <button 
        @click="navigateToExplorer"
        class="flex items-center text-title text-sm"
      >
        Show all
        <span class="material-icons text-lg ml-1">chevron_right</span>
      </button>
    </div>
    <div 
      class="flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 hide-scrollbar snap-x snap-mandatory"
      @scroll="handleScroll"
    >
      <BookCard
        v-for="book in books"
        :key="book.title"
        v-bind="book"
        class="snap-start flex-shrink-0"
      />
    </div>
    <SliderDots 
      v-if="books.length > 3"
      :total="books.length"
      :current="currentSlide"
    />
  </section>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}</style>