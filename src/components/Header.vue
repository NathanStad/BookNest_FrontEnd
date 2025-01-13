<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import NotificationsPanel from './NotificationsPanel.vue';

const router = useRouter();
const showNotifications = ref(false);

const goToAuth = () => {
  router.push('/register');
};
</script>

<template>
  <header class="flex justify-between items-center p-4">
    <div class="flex items-center">
      <img src="/images/logo.png" alt="BookNest" class="h-11">
    </div>
    <div class="flex gap-2">
      <button 
        @click="showNotifications = !showNotifications"
        class="w-9 h-9 bg-primary rounded-full flex items-center justify-center relative" 
        style="background-color: #707C6A"
      >
        <span class="material-icons text-white text-[20px]">notifications</span>
        <span 
          class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center"
        >3</span>
      </button>
      <button 
        @click="goToAuth"
        class="w-9 h-9 rounded-full flex items-center justify-center" 
        style="background-color: #707C6A;"
      >
        <span class="material-icons text-white text-[20px]">person</span>
      </button>
    </div>
  </header>
  
  <!-- Notifications Panel -->
  <NotificationsPanel
    v-if="showNotifications"
    @close="showNotifications = false"
  />
</template>