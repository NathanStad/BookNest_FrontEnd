import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useNavbar() {
  const route = useRoute();
  
  const showNavbar = computed(() => {
    // Liste des routes où la navbar ne doit pas apparaître
    const hiddenNavbarRoutes = ['/register', '/login', '/profile', '/book'];
    return !hiddenNavbarRoutes.some(path => route.path.startsWith(path));
  });

  return {
    showNavbar
  };
}