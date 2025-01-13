<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { authState } = useAuth();
const notificationsEnabled = ref(true);

const goBack = () => {
  router.back();
};

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '**********'
});

const goToLibrary = (section: 'favorites' | 'wishlist') => {
  router.push({
    path: '/library',
    query: { filter: section }
  });
};
</script>

<template>
  
  <div class="min-h-screen bg-cover bg-center">
    <!-- Back button -->
    <div class="p-6">
      <button 
        @click="goBack" 
        class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
      >
        <span class="material-icons text-title">arrow_back</span>
      </button>
    </div>

    <!-- Profile Content -->
    <div class="px-6 pt-4 flex flex-col min-h-[calc(100vh-88px)]">
      <h1 class="text-3xl font-medium text-title">Bonjour John,</h1>
      <p class="text-title/80 text-lg mb-12">bienvenu sur ton profil !</p>

      <!-- Quick Actions -->
      <div class="flex gap-4 mb-12">
        <button 
          @click="goToLibrary('favorites')"
          class="flex-1 bg-background/90 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 shadow-lg"
        >
          <span class="material-icons text-title">favorite</span>
          <span class="text-title text-sm">Mes favoris</span>
        </button>
        <button 
          @click="goToLibrary('wishlist')"
          class="flex-1 bg-background/90 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 shadow-lg"
        >
          <span class="material-icons text-title">bookmark</span>
          <span class="text-title text-sm">Ma wishlist</span>
        </button>
      </div>

      <!-- Profile Fields -->
      <div class="space-y-6 flex-grow">
        <div>
          <label class="text-title/80 text-sm">Votre nom</label>
          <div class="mt-1 flex items-center justify-between bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
            <span class="text-title">{{ user.name }}</span>
            <span class="material-icons text-title/60">chevron_right</span>
          </div>
        </div>

        <div>
          <label class="text-title/80 text-sm">Email</label>
          <div class="mt-1 flex items-center justify-between bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
            <span class="text-title">{{ user.email }}</span>
            <span class="material-icons text-title/60">chevron_right</span>
          </div>
        </div>

        <div>
          <label class="text-title/80 text-sm">Mot de passe</label>
          <div class="mt-1 flex items-center justify-between bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg">
            <span class="text-title">{{ user.password }}</span>
            <span class="material-icons text-title/60">chevron_right</span>
          </div>
        </div>
      </div>

      <!-- Update Button -->
      <button class="w-full bg-title text-background rounded-lg py-3 mt-12 shadow-lg">
        Mettre à jour mes informations
      </button>

      <!-- Separator -->
      <div class="h-[3px] bg-[#707C6A] my-10"></div>

      <!-- Notifications Toggle -->
      <div class="flex items-center justify-between bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg mb-6">
        <div class="flex items-center gap-3">
          <span class="material-icons text-title">notifications</span>
          <span class="text-title">Activer les notifications</span>
        </div>
        <button 
          @click="notificationsEnabled = !notificationsEnabled"
          class="w-12 h-6 rounded-full relative transition-colors duration-200"
          :class="notificationsEnabled ? 'bg-title' : 'bg-title/30'"
        >
          <div 
            class="w-5 h-5 bg-background rounded-full absolute top-0.5 transition-transform duration-200"
            :class="notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'"
          ></div>
        </button>
      </div>
    </div>
  </div>
</template>