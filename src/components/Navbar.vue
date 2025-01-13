<template>
  <div 
    class="fixed bottom-0 left-0 w-full flex justify-around bg-[#707c6a] py-2 shadow-md"
  >
    <!-- Home -->
    <router-link to="/" class="flex flex-col items-center">
      <div
        class="flex justify-center items-center w-9 h-9 rounded-full transition-all duration-300"
        :class="$route.path === '/' ? 'active-icon-bg' : 'bg-transparent'"
      >
        <span 
          class="material-icons text-lg"
          :class="$route.path === '/' ? 'text-[#e9e1d6]' : 'text-[#b9d4ac]'"
        >home</span>
      </div>
      <span 
        class="text-[11px] mt-1"
        :class="$route.path === '/' ? 'text-[#e9e1d6]' : 'text-[#b9d4ac]'"
      >Home</span>
    </router-link>

    <!-- Explorer -->
    <router-link to="/explorer" class="flex flex-col items-center">
      <div
        class="flex justify-center items-center w-9 h-9 rounded-full transition-all duration-300"
        :class="$route.path === '/explorer' ? 'active-icon-bg' : 'bg-transparent'"
      >
        <span 
          class="material-icons text-lg"
          :class="$route.path === '/explorer' ? 'text-[#e9e1d6]' : 'text-[#b9d4ac]'"
        >search</span>
      </div>
      <span 
        class="text-[11px] mt-1"
        :class="$route.path === '/explorer' ? 'text-[#e9e1d6]' : 'text-[#b9d4ac]'"
      >Explorer</span>
    </router-link>

    <!-- Bibliothèque -->
    <router-link to="/library" class="flex flex-col items-center">
      <div
        class="flex justify-center items-center w-9 h-9 rounded-full transition-all duration-300"
        :class="$route.path === '/library' ? 'active-icon-bg' : 'bg-transparent'"
      >
        <span 
          class="material-icons text-lg"
          :class="$route.path === '/library' ? 'text-[#e9e1d6]' : 'text-[#b9d4ac]'"
        >menu_book</span>
      </div>
      <span 
        class="text-[11px] mt-1"
        :class="$route.path === '/library' ? 'text-[#e9e1d6]' : 'text-[#b9d4ac]'"
      >Library</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped>
.active-icon-bg {
  background: linear-gradient(135deg, #808978 0%, #9bab92 100%);
}
</style>