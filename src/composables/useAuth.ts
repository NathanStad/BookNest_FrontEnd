import { ref } from 'vue';
import type { RegisterForm, AuthState, LoginForm } from '../types/auth';

export function useAuth() {
  const authState = ref<AuthState>({
    isAuthenticated: false,
    user: null
  });

  const register = async (form: RegisterForm) => {
    // TODO: Implement actual registration logic with Supabase
    console.log('Registering user:', form);
    authState.value = {
      isAuthenticated: true,
      user: {
        name: form.name,
        email: form.email
      }
    };
  };

  const login = async (form: LoginForm) => {
    // TODO: Implement actual login logic with Supabase
    console.log('Logging in user:', form);
    authState.value = {
      isAuthenticated: true,
      user: {
        name: 'John Doe', // This would come from the backend
        email: form.email
      }
    };
  };

  return {
    authState,
    register,
    login
  };
}