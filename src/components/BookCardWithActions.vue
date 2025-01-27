<script setup lang="ts">
import { useBooks } from '../composables/useBooks';
import { useRoute, useRouter } from 'vue-router';
import type { Book } from '../types/book';
import { ref } from 'vue';

interface Props extends Book {
  showRemoveButton?: boolean;
}
const route = useRoute();

const router = useRouter();
const props = defineProps<Props>();
console.log('props', props);

const goToDetail = (event: Event) => {
  // Empêcher la navigation si on clique sur un bouton d'action
    router.push('/book/' + props._id);
  };
  const book = ref(props);
  console.log('book', book.value);

  const getUserId = (): string | null => {
  const user = localStorage.getItem('user'); // Récupérer l'utilisateur depuis le localStorage
  if (user) {
    try {
      const parsedUser = JSON.parse(user); // Parser l'utilisateur
      return parsedUser.id; // Retourner l'ID de l'utilisateur
    } catch (error) {
      console.error('Erreur lors du parsing de l’utilisateur :', error);
      return null;
    }
  }
  return null;
};
const handleToggleWishlist = async () => {
  const userId = getUserId(); // Récupérer l'ID utilisateur
  const bookId = book.value._id;
  
  if (!userId || !bookId) {
    console.error('Utilisateur ou livre non défini.');
    return;
  }

  const apiUrl = `https://booknest-restapi.onrender.com/api/users/${userId}/wishlist`;

  try {
    if (book.value?.isWishlist) {
      // Supprimer de la wishlist
      const response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        book.value.isWishlist = false;
      }
    } else {
      // Ajouter à la wishlist
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        book.value.isWishlist = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la wishlist :', error);
  }
};
const handleToggleFavorite = async () => {
  const userId = getUserId(); // Récupérer l'ID utilisateur
  const bookId = book.value._id;
  if (!userId || !bookId) {
    console.error('Utilisateur ou livre non défini.');
    return;
  }

  const apiUrl = `https://booknest-restapi.onrender.com/api/users/${userId}/favorites`;

  try {
    if (book.value?.isFavorite) {
      // Supprimer des favoris
      const response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        book.value.isFavorite = false;
      }
    } else {
      // Ajouter aux favoris
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        book.value.isFavorite = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des favoris :', error);
  }
};

const handleToggleRead = async () => {
  const userId = getUserId(); // Récupérer l'ID utilisateur
  const bookId = book.value._id;
  if (!userId || !bookId) {
    console.error('Utilisateur ou livre non défini.');
    return;
  }

  const apiUrl = `https://booknest-restapi.onrender.com/api/users/${userId}/already-read`;

  try {
    if (book.value?.isRead) {
      // Supprimer de la liste "Déjà lu"
      const response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        book.value.isRead = false;
      }
    } else {
      // Ajouter à la liste "Déjà lu"
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        book.value.isRead = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la liste "Déjà lu" :', error);
  }
};

</script>

<template>
  <div class="relative cursor-pointer" @click="goToDetail">
    <img 
      :src="cover_image" 
      :alt="title"
      class="w-full aspect-[2/3] object-cover rounded-lg shadow-md mb-2"
    />
    <!-- Action buttons -->
    <div class="absolute bottom-16 right-2 flex gap-2">
      <button 
        @click.stop="handleToggleWishlist"
        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        :class="book.isWishlist ? 'bg-title text-background' : 'bg-background/80 text-title'"
      >
        <span class="material-icons text-lg">bookmark</span>
      </button>
      <button 
        @click.stop="handleToggleFavorite"
        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        :class="book.isFavorite ? 'bg-title text-background' : 'bg-background/80 text-title'"
      >
        <span class="material-icons text-lg">favorite</span>
      </button>
      <button 
        @click.stop="handleToggleRead"
        class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        :class="book.isRead ? 'bg-title text-background' : 'bg-background/80 text-title'"
      >
        <span class="material-icons text-lg">check_circle</span>
      </button>
    </div>
    <h3 class="text-primary font-medium text-sm">{{ title }}</h3>
    <p class="text-primary/70 text-xs">{{ author }}</p>
  </div>
</template>
