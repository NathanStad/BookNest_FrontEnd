<script setup lang="ts">
import Header from '../components/Header.vue';
import BookOfTheDay from '../components/BookOfTheDay.vue';
import BookSection from '../components/BookSection.vue';
import VirtualLibrary from '../components/VirtualLibrary.vue';
import Navbar from '../components/Navbar.vue';

const magicBooks = [
  {
    id: 1,
    title: 'Titre du livre',
    author: 'Auteur',
    genre: 'Fantastique',
    image: '/images/book-example1.png'
  },
  {
    id: 2,
    title: 'Titre du livre',
    author: 'Auteur',
    genre: 'Fantastique',
    image: '/images/book-example2.png'
  },
  {
    id: 3,
    title: 'Titre du livre',
    author: 'Auteur',
    genre: 'Fantastique',
    image: '/images/book-example3.png'
  },
  {
    id: 4,
    title: 'Titre du livre',
    author: 'Auteur',
    genre: 'Fantastique',
    image: '/images/book-example1.png'
  },
  {
    id: 5,
    title: 'Titre du livre',
    author: 'Auteur',
    genre: 'Fantastique',
    image: '/images/book-example2.png'
  },
  {
    id: 6,
    title: 'Titre du livre',
    author: 'Auteur',
    genre: 'Fantastique',
    image: '/images/book-example3.png'
  }
];

const universeBooks = magicBooks.map(book => ({
  ...book,
  genre: 'Science-fiction'
}));

const thrillerBooks = magicBooks.map(book => ({
  ...book,
  genre: 'Thriller & Suspense'
}));
</script>

<template>
  <div class="min-h-screen bg-background pb-16">
    <Header />
    <BookOfTheDay />
    <BookSection 
      title="Laissez la magie vous emporter"
      :books="magicBooks"
      genre="Fantastique"
    />
    <VirtualLibrary />
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
    <Navbar />
  </div>
</template>