<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  _id: string;
  title: string;
  author_id: Array<string>;
  genres: Array<string>;
  cover_image: string;
}>();

const router = useRouter();

const goToDetail = () => {
  router.push({ name: 'book-detail', params: { id: props._id } });
};
</script>

<template>
  <div class="book-card cursor-pointer" @click="goToDetail">
    <img :src="cover_image" :alt="title" class="book-image">
    <h3 class="book-title">{{ title }}</h3>
    <p class="book-author">{{ author_id.name }}</p>
    <p class="book-genres">
      <span v-for="genres in genre" :key="genres" class="book-genre">{{ genre }}</span>
    </p>
  </div>
</template>

<style scoped>
div.book-card {
  width: 150px 
}
</style>