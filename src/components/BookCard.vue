<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: number;
  title: string;
  author: string;
  genre: string;
  image: string;
}>();

const router = useRouter();

const goToDetail = () => {
  router.push({ name: 'book-detail', params: { id: props.id } });
};
</script>

<template>
  <div class="book-card cursor-pointer" @click="goToDetail">
    <img :src="image" :alt="title" class="book-image">
    <h3 class="book-title">{{ title }}</h3>
    <p class="book-author">{{ author }}</p>
    <p class="book-genre">{{ genre }}</p>
  </div>
</template>