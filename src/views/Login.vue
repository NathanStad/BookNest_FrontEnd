<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const showPassword = ref(false);
const isLoading = ref(false); // Indique si une requête est en cours
const errorMessage = ref(''); // Message d'erreur à afficher

// Données du formulaire de connexion
const form = ref({
  email: '',
  password: ''
});

const inputError = ref({
  email: false,
  password: false
});

// Vérifier si l'utilisateur est déjà connecté
const checkUserSession = () => {
  const user = localStorage.getItem('user');
  if (user) {
    router.push('/profile'); // Redirige vers le profil si l'utilisateur est déjà connecté
  }
};

// Fonction pour gérer la soumission du formulaire
const handleSubmit = async () => {
  const loginApiUrl = 'https://booknest-restapi.onrender.com/api/users/login';
  const fetchUserApiUrl = `https://booknest-restapi.onrender.com/api/users/email/${form.value.email}`;

  isLoading.value = true;
  errorMessage.value = '';
  inputError.value = { email: false, password: false }; // Réinitialise les erreurs

  try {
    // Appel API pour l'authentification
    const loginResponse = await axios.post(loginApiUrl, {
      email: form.value.email,
      password: form.value.password
    });

    const { token } = loginResponse.data;

    // Stocker le token dans le localStorage
    localStorage.setItem('token', token);

    // Appel API pour récupérer les données utilisateur
    const userResponse = await axios.get(fetchUserApiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Stocker les données utilisateur dans le localStorage
    localStorage.setItem('user', JSON.stringify(userResponse.data));

    // Redirige vers le profil
    router.push('/profile');
  } catch (error: any) {
    console.error('Erreur :', error);
    if (error.response?.status === 400) {
      errorMessage.value = 'Votre Email ou Mot de passes sont invalides. Veuillez vérifier vos informations.';
      inputError.value = { email: true, password: true }; // Ajoute une erreur aux champs
    } else {
      errorMessage.value = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    }
  } finally {
    isLoading.value = false; // Réinitialise l'état de chargement
  }
};

// Redirection vers la page d'inscription
const goToRegister = () => {
  router.push('/register');
};

// Retour à la page précédente
const goBack = () => {
  router.back();
};

// Vérifie si l'utilisateur est déjà connecté au montage
onMounted(() => {
  checkUserSession();
});
</script>

<template>
  <div class="min-h-screen bg-cover bg-center" style="background-image: url('/images/background.jpg')">
    <div class="p-4">
      <button 
        @click="goBack" 
        class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
      >
        <span class="material-icons text-title">arrow_back</span>
      </button>
    </div>

    <div class="px-6 pt-12">
      <h1 class="text-3xl font-medium text-title mb-16">Se connecter</h1>

      <div class="bg-title/90 backdrop-blur-sm rounded-3xl p-6 text-background">
        <p class="mb-8">
          Bon retour parmi nous ! Connectez-vous pour accéder à votre bibliothèque.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              :class="['w-full px-4 py-3 rounded-lg bg-background/90 text-primary placeholder-primary/70', inputError.email ? 'border-2 border-red-500' : '']"
              required
            />
          </div>

          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mot de passe"
              :class="['w-full px-4 py-3 rounded-lg bg-background/90 text-primary placeholder-primary/70', inputError.password ? 'border-2 border-red-500' : '']"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <span class="material-icons text-primary/70">
                {{ showPassword ? 'visibility_off' : 'visibility' }}
              </span>
            </button>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 rounded-lg mt-8 font-medium"
            :class="isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#C5D1BC] text-primary'"
          >
            {{ isLoading ? 'Chargement...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Affichage du message d'erreur -->
        <p v-if="errorMessage" class="mt-4 text-red-500 text-sm">{{ errorMessage }}</p>

        <p class="text-center mt-6">
          Pas encore de compte ?
          <button @click="goToRegister" class="font-medium underline ml-1">
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
