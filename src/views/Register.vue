<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import type { RegisterForm } from '../types/auth';

const router = useRouter();
const { register } = useAuth();
const showPassword = ref(false);

const form = ref<RegisterForm>({
  name: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  try {
    await register(form.value);
    router.push('/');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

const goToLogin = () => {
  router.push('/login');
};

const goBack = () => {
  router.back();
};
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
      <h1 class="text-3xl font-medium text-title mb-16">S'inscrire</h1>

      <div class="bg-title/90 backdrop-blur-sm rounded-3xl p-6 text-background">
        <p class="mb-8">
          Il semblerait que vous n'ayez pas de compte. Nous allons vous créer un nouveau compte.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <input
              v-model="form.name"
              type="text"
              placeholder="Nom"
              class="w-full px-4 py-3 rounded-lg bg-background/90 text-primary placeholder-primary/70"
              required
            />
          </div>

          <div>
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 rounded-lg bg-background/90 text-primary placeholder-primary/70"
              required
            />
          </div>

          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mot de passe"
              class="w-full px-4 py-3 rounded-lg bg-background/90 text-primary placeholder-primary/70"
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
            class="w-full py-3 bg-[#C5D1BC] text-primary rounded-lg mt-8 font-medium"
          >
            Créer mon compte
          </button>
        </form>

        <p class="text-center mt-6">
          Vous avez déjà un compte?
          <button @click="goToLogin" class="font-medium underline ml-1">
            Se connecter
          </button>
        </p>
      </div>
    </div>
  </div>
</template>