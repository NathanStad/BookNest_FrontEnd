<script setup lang="ts">
import { useNotifications } from '../composables/useNotifications';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { notifications } = useNotifications();
</script>

<template>
  <div class="fixed inset-0 bg-black/20 z-50" @click="emit('close')">
    <div 
      class="absolute right-0 left-0 mx-4 top-16 w-auto bg-background rounded-2xl shadow-xl overflow-hidden sm:right-4 sm:left-auto sm:w-full sm:max-w-sm"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-title/10">
        <h2 class="text-title font-medium">Notifications</h2>
        <button 
          @click="emit('close')"
          class="w-8 h-8 rounded-full bg-title/10 flex items-center justify-center hover:bg-title/20"
        >
          <span class="material-icons text-title">close</span>
        </button>
      </div>

      <!-- Notifications List -->
      <div class="max-h-[calc(100vh-12rem)] overflow-y-auto">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          class="p-4 border-b border-title/10 hover:bg-title/5 transition-colors"
        >
          <div class="flex gap-3">
            📚
            <div>
              <h3 class="text-title font-medium mb-1">{{ notification.title }}</h3>
              <p class="text-title/70 text-sm">{{ notification.message }}</p>
            </div>
          </div>
        </div>

        <div v-if="notifications.length === 0" class="p-8 text-center text-title/70">
          Aucune notification pour le moment
        </div>
      </div>
    </div>
  </div>
</template>