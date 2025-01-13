<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { useNavbar } from './composables/useNavbar';

const { showNavbar } = useNavbar();
</script>

<template>
  <RouterView />
  <Navbar v-if="showNavbar" />
</template>