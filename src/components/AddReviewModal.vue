<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', review: { content: string; rating: number }): void;
}>();

const goBack = () => {
  emit('close');
};

const rating = ref(5);

const setRating = (value: number) => {
  rating.value = value;
};

const handleSubmit = () => {
  emit('submit', {
    content: content.value,
    rating: rating.value
  });
  emit('close');
};

const content = ref('');
</script>

<template>
  <div class="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
    <div class="bg-[#707C6A] w-full max-w-md mx-4 rounded-2xl">
      <!-- Header -->
      <div class="p-4 flex items-center justify-between border-b border-background/10">
        <div class="flex items-center gap-4">
          <h1 class="text-background text-lg">Ajouter un avis</h1>
        </div>
        <button 
          @click="goBack"
          class="w-8 h-8 bg-background/20 rounded-full flex items-center justify-center hover:bg-background/30"
        >
          <span class="material-icons text-background">close</span>
        </button>
      </div>

      <!-- Form -->
      <div class="p-4 space-y-4">
        <!-- Rating -->
        <div class="flex items-center gap-2 justify-center">
          <button
            v-for="star in 5"
            :key="star"
            @click="setRating(star)"
            class="text-2xl transition-transform hover:scale-110"
            :class="star <= rating ? 'text-background' : 'text-background/30'"
          >
            ⭐
          </button>
        </div>
        
        <textarea
          v-model="content"
          placeholder="Écris un avis sur ce livre..."
          class="w-full h-32 px-4 py-3 rounded-lg bg-background/90 text-title placeholder-title/70 resize-none focus:outline-none"
        ></textarea>

        <button
          @click="handleSubmit"
          class="w-full py-3 bg-[#E9E1D6] text-[#707C6A] rounded-lg font-medium mt-4 hover:bg-[#E9E1D6]/90"
        >
          Post ton avis
        </button>
      </div>
    </div>
  </div>
</template>