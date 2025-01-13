import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Explorer from '../views/Explorer.vue';
import Library from '../views/Library.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import BookDetail from '../views/BookDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: Explorer
    },
    {
      path: '/library',
      name: 'library',
      component: Library
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/book/:id',
      name: 'book-detail',
      component: BookDetail
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

export default router;