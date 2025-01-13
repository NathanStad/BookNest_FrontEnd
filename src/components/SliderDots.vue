<script setup lang="ts">
defineProps<{
  total: number;
  current: number;
  groupSize?: number;
}>();
</script>

<template>
  <div 
    class="flex justify-center gap-1 mt-2 overflow-x-auto"
    style="scroll-snap-type: x proximity;"
  >
    <div 
      v-for="n in Math.ceil(total / (groupSize || 3))" 
      :key="n"
      class="h-1 rounded-full transition-all duration-300"
      :class="[
        n === current ? 'w-4 bg-primary' : 'w-1 bg-primary/30'
      ]"
      style="scroll-snap-align: center;"
    ></div>
  </div>
</template>
