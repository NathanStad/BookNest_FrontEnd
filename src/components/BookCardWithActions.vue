<script setup lang="ts">
import { useBooks } from '../composables/useBooks';
import { useRouter } from 'vue-router';
import type { Book } from '../types/book';

interface Props extends Book {
  showRemoveButton?: boolean;
}

const router = useRouter();
const props = defineProps<Props>();
const { toggleFavorite, toggleWishlist, toggleRead } = useBooks();

const emit = defineEmits<{
  (e: 'remove'): void;
}>();

const handleToggleFavorite = () => {
  toggleFavorite(props.id);
};

const handleToggleWishlist = () => {
  toggleWishlist(props.id);
};

const handleToggleRead = () => {
  toggleRead(props.id);
};

const goToDetail = (event: Event) => {
  // Empêcher la navigation si on clique sur un bouton d'action
  if (!(event.target as HTMLElement).closest('button')) {
    router.push({ name: 'book-detail', params: { id: props.id } });
  }
};
</script>

<template>
  <div class="relative cursor-pointer" @click="goToDetail">
    <img 
      :src="image" 
      :alt="title"
      class="w-full aspect-[2/3] object-cover rounded-lg shadow-md mb-2"
    />
    <!-- Action buttons -->
    <div class="absolute bottom-16 right-2 flex gap-2">
      <button 
        @click="handleToggleWishlist"
        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        :class="isWishlist ? 'bg-title text-background' : 'bg-background/80 text-title'"
      >
        <span class="material-icons text-lg">bookmark</span>
      </button>
      <button 
        @click="handleToggleFavorite"
        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        :class="isFavorite ? 'bg-title text-background' : 'bg-background/80 text-title'"
      >
        <span class="material-icons text-lg">favorite</span>
      </button>
      <button 
        @click="handleToggleRead"
        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        :class="isRead ? 'bg-title text-background' : 'bg-background/80 text-title'"
      >
        <span class="material-icons text-lg">check_circle</span>
      </button>
    </div>
    <!-- Remove button -->
    <button 
      v-if="showRemoveButton"
      @click="emit('remove')"
      class="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 text-title flex items-center justify-center transition-colors hover:bg-title hover:text-background"
    >
      <span class="material-icons text-lg">close</span>
    </button>
    <h3 class="text-primary font-medium text-sm">{{ title }}</h3>
    <p class="text-primary/70 text-xs">{{ author }}</p>
  </div>
</template>