<script setup lang="ts">
import Header from "../components/Header.vue";
import BookOfTheDay from "../components/BookOfTheDay.vue";
import BookSection from "../components/BookSection.vue";
import VirtualLibrary from "../components/VirtualLibrary.vue";
import Navbar from "../components/Navbar.vue";
import { ref, onMounted, watch } from "vue";

const books = ref([]); // Liste des livres récupérés
const isLoading = ref(true); // Indique si le chargement est en cours
const magicBooks = ref([]); // Livres filtrés par genre "Fantastique"
const universeBooks = ref([]); // Livres filtrés par genre "Science-fiction"
const thrillerBooks = ref([]); // Livres filtrés par genre "Thriller & Suspense"

// Fonction pour récupérer les livres depuis l'API
const fetchBooks = async () => {
  const apiUrl = import.meta.env.VITE_API_URL; // URL de base de l'API
  let currentPage = 1;
  let totalPages = 6; // Ajustable selon la réponse API

  try {
    const fetchedBooks = [];

    while (currentPage <= totalPages) {
      const response = await fetch(`${apiUrl}books?page=${currentPage}&limit=6`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      const { books: newBooks, meta } = data || {};

      if (!newBooks || !meta) {
        throw new Error("Données invalides : livres ou méta-informations manquantes");
      }

      fetchedBooks.push(...newBooks);

      // Mise à jour des pages
      totalPages = meta.pages || totalPages;
      currentPage++;
    }

    // Mettre à jour les livres et le localStorage
    books.value = fetchedBooks;
    localStorage.setItem("books", JSON.stringify(fetchedBooks));
  } catch (err) {
    console.error("Erreur lors de la récupération des livres :", err);
  } finally {
    isLoading.value = false; // Chargement terminé
  }
};

// Fonction pour charger les données depuis le localStorage ou l'API
const loadBooks = async () => {
  const storedBooks = localStorage.getItem("books");

  if (storedBooks) {
    console.log("Chargement des livres depuis le localStorage...");
    books.value = JSON.parse(storedBooks);
    isLoading.value = false; // Chargement terminé
  } else {
    console.log("Aucune donnée trouvée dans le localStorage, récupération depuis l'API...");
    await fetchBooks();
  }
};

// Filtrer les livres par genre dès que les données changent
watch(
  books,
  (newBooks) => {
    console.log("Livres récupérés :", newBooks);

    magicBooks.value = newBooks.filter((book) =>
      book.genres?.some((genre) => genre.name?.trim().toLowerCase() === "fantastique")
    );

    universeBooks.value = newBooks.filter((book) =>
      book.genres?.some((genre) => genre.name?.trim().toLowerCase() === "science-fiction")
    );

    thrillerBooks.value = newBooks.filter((book) =>
      book.genres?.some((genre) => genre.name?.trim().toLowerCase() === "thriller & suspense")
    );

    console.log("Magic Books filtrés :", magicBooks.value);
    console.log("Universe Books filtrés :", universeBooks.value);
    console.log("Thriller Books filtrés :", thrillerBooks.value);
  },
  { immediate: true }
);

// Appel de la fonction loadBooks lorsque le composant est monté
onMounted(() => {
  console.log("Chargement des livres...");
  loadBooks();
});
</script>

<template>
  <div class="min-h-screen bg-background pb-16">
    <Header />
    <BookOfTheDay />
    <div v-if="isLoading" class="text-center text-gray-500">
      Chargement des livres...
    </div>
    <template v-else>
      <BookSection
        title="Laissez la magie vous emporter"
        :books="magicBooks"
        genre="Fantastique"
      />
      <BookSection
        title="Explorez les frontières de l'univers"
        :books="universeBooks"
        genre="Science-fiction"
      />
      <BookSection
        title="Des livres qui vous tiendront en haleine"
        :books="thrillerBooks"
        genre="Thriller & Suspense"
      />
    </template>
    <VirtualLibrary />
    <Navbar />
  </div>
</template>
