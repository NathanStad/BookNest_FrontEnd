<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SliderDots from "../components/SliderDots.vue";
import AddReviewModal from "../components/AddReviewModal.vue";
import { ref, computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

interface Book {
  cover_image: string;
  title: string;
  author: string;
}

const state = ref({
  isWishlist: false,
  isFavorite: false,
  isRead: false,
});

const book = ref<Book | null>(null); // Livre à afficher
const isLoading = ref(true); // Indique si le chargement est en cours
const bookReviews = ref([]); // Liste des avis du livre
const currentReviewSlide = ref(1);
const reviewsContainer = ref<HTMLElement | null>(null);
const showAddReview = ref(false);
const user = ref(null); // Stocker les informations de l'utilisateur connecté

// Fonction pour récupérer un livre par ID
const fetchBookById = async (id: string) => {
  const apiUrl = import.meta.env.VITE_API_URL; // URL de base de l'API
  try {
    const response = await fetch(`${apiUrl}books/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération du livre : ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);
    book.value = data;
  } catch (err) {
    console.error("Erreur lors de la récupération du livre :", err);
    router.push("/404"); // Redirige vers une page 404 si le livre n'existe pas
  } finally {
    isLoading.value = false;
  }
};

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

const fetchBookStates = async (userId: string, bookId: string) => {
  
  const apiUrl = `https://booknest-restapi.onrender.com/api/users/${userId}`;

  try {
    const [wishlistResponse, favoriteResponse, readResponse] = await Promise.all([
      fetch(`${apiUrl}/wishlist`),
      fetch(`${apiUrl}/favorites`),
      fetch(`${apiUrl}/already-read`),
    ]);

    if (!wishlistResponse.ok || !favoriteResponse.ok || !readResponse.ok) {
      throw new Error("Erreur lors de la récupération des états.");
    }

    const wishlistData = await wishlistResponse.json();
    const favoriteData = await favoriteResponse.json();
    const readData = await readResponse.json();

    console.log("Données des états :", wishlistData, favoriteData, readData);
    
    

      state.value.isWishlist = wishlistData.some((item: any) => item.book_id._id === bookId);
      state.value.isFavorite = favoriteData.some((item: any) => item.book_id._id === bookId);
      state.value.isRead = readData.some((item: any) => item.book_id._id === bookId);
  } catch (error) {
    console.error("Erreur lors de la récupération des états :", error);
  }
};


const handleToggleWishlist = async () => {
  const userId = getUserId(); // Récupérer l'ID utilisateur
  const bookId = route.params.id as string;
  
  if (!userId || !bookId) {
    console.error('Utilisateur ou livre non défini.');
    return;
  }

  const apiUrl = `https://booknest-restapi.onrender.com/api/users/${userId}/wishlist`;

  try {
    if (state.value?.isWishlist) {
      // Supprimer de la wishlist
      const response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        state.value.isWishlist = false;
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
        state.value.isWishlist = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la wishlist :', error);
  }
};
const handleToggleFavorite = async () => {
  const userId = getUserId(); // Récupérer l'ID utilisateur
  const bookId = route.params.id as string;
  if (!userId || !bookId) {
    console.error('Utilisateur ou livre non défini.');
    return;
  }

  const apiUrl = `https://booknest-restapi.onrender.com/api/users/${userId}/favorites`;

  try {
    if (state.value?.isFavorite) {
      // Supprimer des favoris
      const response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        state.value.isFavorite = false;
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
        state.value.isFavorite = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des favoris :', error);
  }
};

const handleToggleRead = async () => {
  const userId = getUserId(); // Récupérer l'ID utilisateur
  const bookId = route.params.id as string;
  if (!userId || !bookId) {
    console.error('Utilisateur ou livre non défini.');
    return;
  }

  const apiUrl = `https://booknest-restapi.onrender.com/api/users/${userId}/already-read`;

  try {
    if (state.value?.isRead) {
      // Supprimer de la liste "Déjà lu"
      const response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        state.value.isRead = false;
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
        state.value.isRead = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la liste "Déjà lu" :', error);
  }
};

const socket = ref<WebSocket | null>(null);

const fetchReviews = async (bookId: string) => {
  const apiUrl = `https://booknest-restapi.onrender.com/api/books/${bookId}/critiques`; // URL de l'API pour récupérer les critiques
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des critiques : ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Critiques récupérées :", data);

    // Mettre à jour les avis du livre
    bookReviews.value = data;
  } catch (error) {
    console.error("Erreur lors de la récupération des critiques :", error);
    alert("Impossible de charger les critiques. Veuillez réessayer plus tard.");
  }
};
// Initialiser la connexion WebSocket
const setupWebSocket = (bookId: string) => {
  const wsUrl = `wss://booknest-restapi.onrender.com/api/books/${bookId}/critiques`;
  socket.value = new WebSocket(wsUrl);

  // Lorsque la connexion est ouverte
  socket.value.onopen = () => {
    console.log("WebSocket connecté.");
  };

  // Lorsque des données sont reçues
  socket.value.onmessage = (event) => {
    const newReview = JSON.parse(event.data);
    console.log("Nouvel avis reçu :", newReview);
    bookReviews.value.push(newReview); // Ajouter l'avis reçu à la liste
  };

  // Gestion des erreurs
  socket.value.onerror = (error) => {
    console.error("Erreur WebSocket :", error);
  };

  // Lorsque la connexion est fermée
  socket.value.onclose = () => {
    console.log("WebSocket déconnecté.");
  };
};
const handleAddReview = async (review: { content: string; rating: number }) => {
  const userId = getUserId(); // Obtenez l'ID utilisateur
  const bookId = route.params.id as string;

  if (!userId || !bookId) {
    console.error("Utilisateur ou livre non défini.");
    return;
  }

  try {
    const apiUrl = `https://booknest-restapi.onrender.com/api/books/${bookId}/critiques`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        rating: review.rating,
        comment: review.content,
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de la critique.");
    }
    console.log(response.ok);
    
    const newReview = await response.json();
    console.log("Nouvelle critique ajoutée :", newReview);

    // Ajoutez la critique à la liste localement
    bookReviews.value.push(newReview);

    // Fermez la modal d'ajout
    showAddReview.value = false;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la critique :", error);
  }
};


// Gestion du défilement des avis
const handleReviewScroll = (event: Event) => {
  const container = event.target as HTMLElement;
  const scrollPosition = container.scrollLeft;
  const width = container.clientWidth;
  currentReviewSlide.value = Math.floor(scrollPosition / width) + 1;
};

// Retour à la page précédente
const goBack = () => {
  router.back();
};

// Vérifier si l'utilisateur est connecté
const checkUserSession = () => {
  const userData = localStorage.getItem("user"); // Récupérer les données de l'utilisateur depuis le localStorage
  if (userData) {
    user.value = JSON.parse(userData);
  }
};

onMounted(() => {
  const bookId = route.params.id as string;
  checkUserSession();
  fetchBookById(bookId);
  // Récupérer les critiques existantes
  fetchReviews(bookId);
  fetchBookStates(getUserId() || '', bookId);
  setupWebSocket(bookId); // Configurer le WebSocket
});
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Indicateur de chargement -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <p class="text-title text-lg">Chargement...</p>
    </div>

    <div v-else>
      <!-- Header avec boutons -->
      <div class="relative h-[400px]">
        <!-- Image de fond avec overlay -->
        <div class="absolute inset-0 overflow-hidden">
          <img
            :src="book?.cover_image"
            :alt="book?.title"
            class="w-full h-full object-cover blur-sm opacity-80"
          />
          <div
            class="absolute inset-0 bg-gradient-to-b from-black/40 to-background"
          ></div>
        </div>

        <!-- Boutons de navigation -->
        <div class="relative z-10 flex justify-between items-start p-4">
          <button
            @click="goBack"
            class="w-10 h-10 bg-[#707C6A] backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <span class="material-icons text-background">arrow_back</span>
          </button>
          <div class="flex flex-col gap-3">
            <button
              @click="handleToggleWishlist"
              class="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center"
              :class="
                state?.isWishlist
                  ? 'bg-[#707C6A] text-background'
                  : 'bg-background/80 text-[#707C6A]'
              "
            >
              <span class="material-icons text-lg">bookmark</span>
            </button>
            <button
              @click="handleToggleFavorite"
              class="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center"
              :class="
                state?.isFavorite
                  ? 'bg-[#707C6A] text-background'
                  : 'bg-background/80 text-[#707C6A]'
              "
            >
              <span class="material-icons text-lg">favorite</span>
            </button>
            <button
              @click="handleToggleRead"
              class="w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center"
              :class="
                state?.isRead
                  ? 'bg-[#707C6A] text-background'
                  : 'bg-background/80 text-[#707C6A]'
              "
            >
              <span class="material-icons text-lg">check_circle</span>
            </button>
          </div>
        </div>

        <!-- Couverture du livre -->
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4"
        >
          <img
            :src="book?.cover_image"
            :alt="book?.title"
            class="w-48 rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      <!-- Contenu -->
      <div class="px-6 pt-4">
        <!-- Titre et auteur -->
        <h1 class="text-3xl font-bold text-title text-center mb-2">
          {{ book?.title }}
        </h1>
        <p class="text-title/70 text-center mb-4">{{ book?.author_id.name }}</p>

        <!-- Genres -->
        <div class="flex justify-center gap-2 mb-6">
          <span
            v-for="genre in ['Science-fiction', 'Fantaisie']"
            :key="genre"
            class="px-4 py-1 rounded-full bg-title/10 text-title text-sm"
          >
            {{ genre }}
          </span>
        </div>

        <!-- Séparateur -->
        <div class="h-[3px] bg-[#707C6A] rounded-full my-6"></div>

        <!-- Synopsis -->
        <div class="mb-6">
          <h2 class="text-title font-medium mb-3">Synopsis</h2>
          <p class="text-title/70">
            {{ book?.summary }}
          </p>
        </div>

        <!-- Informations -->
        <div class="flex justify-between text-sm text-title/70 mb-8">
          <span
            >Date de sortie :
            {{ new Date(book?.publication_date).toLocaleDateString() }}</span
          >
          <span>374 pages</span>
        </div>

        <!-- Séparateur -->
        <div class="h-[3px] bg-[#707C6A] rounded-full my-6"></div>

        <!-- Emprunter -->
        <div class="mb-8">
          <h2 class="text-title font-medium mb-4">Emprunter le livre</h2>
          <a
            href="https://www.bcu-lausanne.ch/"
            target="_blank"
            class="w-full bg-[#707C6A] text-background rounded-lg p-4 flex items-center justify-between mb-2"
          >
            <span class="text-[#E9E1D6]">Bibliothèque de Lausanne</span>
            <span class="material-icons text-background">chevron_right</span>
          </a>
          <a
            href="https://bibliothequevallorbe.ch/"
            target="_blank"
            class="w-full bg-[#707C6A] text-background rounded-lg p-4 flex items-center justify-between"
          >
            <span class="text-[#E9E1D6]">Bibliothèque de Vallorbe</span>
            <span class="material-icons text-background">chevron_right</span>
          </a>
        </div>

        <!-- Séparateur -->
        <div class="h-[3px] bg-[#707C6A] rounded-full my-6"></div>

        <!-- Avis -->
        <div>
          <h2 class="text-title font-medium mb-4">Avis</h2>
          <div
            ref="reviewsContainer"
            class="flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 hide-scrollbar snap-x snap-mandatory"
            @scroll="handleReviewScroll"
          >
            <div
              v-for="review in bookReviews"
              :key="review._id"
              class="bg-[#707C6A] text-[#E9E1D6] rounded-lg p-4 w-[280px] flex-shrink-0 snap-start"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-medium text-[#E9E1D6]">{{ review.user_id.username }}</h3>
                <div class="flex">
                  {{ "⭐".repeat(review.rating || 5) }}
                </div>
              </div>
              <p class="text-[#E9E1D6]/90 text-sm">{{ review.comment }}</p>
            </div>
            <div
              v-if="bookReviews.length === 0"
              class="text-center text-title/70 p-4 w-full"
            >
              Aucun avis pour le moment. Soyez le premier à donner votre avis !
            </div>
          </div>
          <div class="mt-4">
            <SliderDots
              :total="Math.max(bookReviews.length, 1)"
              :current="currentReviewSlide"
              :group-size="1"
            />
          </div>

          <!-- Vérifier si l'utilisateur est connecté -->
          <div v-if="user">
            <button
              @click="showAddReview = true"
              class="px-6 py-3 rounded-lg bg-[#E9E1D6] text-[#707C6A] flex items-center justify-center gap-2 mx-auto mt-6 shadow-[0_4px_14px_rgba(112,124,106,0.4)]"
            >
              Ajouter un avis
              <span class="material-icons">add</span>
            </button>
          </div>
          <div v-else class="text-center text-title/70 mt-6">
            <p>Vous devez être connecté pour laisser un avis.</p>
            <button
              @click="router.push('/login')"
              class="text-primary underline"
            >
              Se connecter
            </button>
          </div>
        </div>

        <!-- ISBN -->
        <p class="text-center text-title/50 text-xs mt-8">
          Code ISBN : 978-3-16-148410-0
        </p>
        <!-- Ajout d'un petit padding en bas pour l'espacement -->
        <div class="h-8"></div>
      </div>
    </div>
  </div>

  <!-- Add Review Modal -->
  <AddReviewModal
    v-if="showAddReview"
    @close="showAddReview = false"
    @submit="handleAddReview"
  />
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
